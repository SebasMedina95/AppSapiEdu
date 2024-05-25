import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from '../dto/create/create-auth.dto';
import { RecoveryUserDto } from '../dto/recovery/recovery-user.dto';

import { User } from '../entities/user.entity';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';
import { IUser, IUserAuthenticated } from '../interfaces/user.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService

  ){}

  async login(createAuthDto: CreateAuthDto): Promise<ApiTransactionResponse<IUserAuthenticated | null>> {

    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder.where("user.user = :username", { username : createAuthDto.user });

    //* ************************* *//
    //* Apliquemos las relaciones *//
    //* ************************* *//
    queryBuilder.leftJoinAndSelect("user.person", "person")
                .leftJoinAndSelect("person.campus", "campus");
    queryBuilder.leftJoinAndSelect("user.permit", "permit")
                .leftJoinAndSelect("permit.role", "roles");

    queryBuilder.select([
      "person",
      "campus",
      "user",
      "permit",
      "roles",
    ]);

    //Obtenemos el resultado de la consulta
    const { entities } = await queryBuilder.getRawAndEntities();

    //Realizamos el juego de validaciones requeridas para el login
    if( !entities || entities.length === 0 )
      return new ApiTransactionResponse(null, EResponseCodes.FAIL, "Error de acceso, usuario no encontrado");

    if( !entities[0].status )
      return new ApiTransactionResponse(null, EResponseCodes.FAIL, "Error de acceso, usuario inhabilitado");

    if( !entities[0].isValid )
      return new ApiTransactionResponse(null, EResponseCodes.FAIL, "Error de acceso, usuario no ha sido verificado");

    if( !bcrypt.compareSync(createAuthDto.password, entities[0].password) )
      return new ApiTransactionResponse(null, EResponseCodes.FAIL, "Error de acceso, contraseña incorrecta");

    //Si pasamos por acá, quiere decir que generamos el Token
    const getUser: IUser = entities[0] as IUser;
    delete getUser.password;

    const objAuthenticated: IUserAuthenticated = {
      user: getUser,
      token: this.getJwtToken({ idUser : Number(getUser.id) })
    }

    return new ApiTransactionResponse(objAuthenticated, EResponseCodes.OK, "Ingresamos al sistema");

  }

  async recovery(recoveryUserDto: RecoveryUserDto): Promise<ApiTransactionResponse<IUser | null>> {

    console.log({recoveryUserDto});
    return null;

  }

  private getJwtToken( payload: IJwtPayload ){

    const token = this.jwtService.sign( payload );
    return token;

  }

  async testingPrivateRoute(): Promise<ApiTransactionResponse<any>> {

    return new ApiTransactionResponse(null, EResponseCodes.INFO, "Saludos desde un método privado!");

  }

}
