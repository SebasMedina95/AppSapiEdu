import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";
import { ApiTransactionResponse } from "src/utils/ApiResponse";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { EResponseCodes } from "src/constants/ResponseCodesEnum";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor(
        @InjectRepository( User ) private readonly userRepository: Repository<User>,
        configService: ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    //Recibimos lo que tendremos a nivel del JWT
    async validate(payload : IJwtPayload): Promise<ApiTransactionResponse<User | UnauthorizedException>> {

        const { idUser } = payload;

        const queryBuilder = this.userRepository.createQueryBuilder("user");

        //* ************************* *//
        //* Apliquemos las relaciones *//
        //* ************************* *//
        queryBuilder.leftJoinAndSelect("user.person", "person")
                    .leftJoinAndSelect("person.campus", "campus");
        queryBuilder.leftJoinAndSelect("user.permit", "permit")
                    .leftJoinAndSelect("permit.role", "roles");

        queryBuilder.where("user.id = :param", { param : idUser });
        const { entities } = await queryBuilder.getRawAndEntities();

        //Si no encontramos información para la creación del token
        if( !entities || entities.length === 0 ) 
            throw new UnauthorizedException("El token no es válido");

        //Validamos los campos de estado y verificación de email para garantizar el acceso
        if( !entities[0].status ) 
            throw new UnauthorizedException("El usuario no está activo. Hable con el administrador.");

        if( !entities[0].isValid ) 
            throw new UnauthorizedException("El email del usuario no está validado. Hable con el administrador.");

        return new ApiTransactionResponse(entities[0], EResponseCodes.OK, "Usuario obtenido.");

    }

}