import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateAuthDto } from '../dto/create/create-auth.dto';
import { RecoveryUserDto } from '../dto/recovery/recovery-user.dto';
import { RecoveryChangeUserDto } from '../dto/recovery/recovery-change-user.dto';

import { User } from '../entities/user.entity';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';
import { IUser, IUserAuthenticated, IUserDecodeToken } from '../interfaces/user.interface';
import { IJwtPayload, IJwtPayloadRecovery } from '../interfaces/jwt-payload.interface';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,

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

  async recoverySend(recoveryUserDto: RecoveryUserDto): Promise<ApiTransactionResponse<IUser | null>> {

    const { email } = recoveryUserDto;
    
    const queryBuilder = this.userRepository.createQueryBuilder("user");

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

    queryBuilder.where("person.email = :param", { param : email });
    const { entities } = await queryBuilder.getRawAndEntities(); //Debería traer 1
    const getUserToEmail = entities[0] as IUser;

    //Tenemos datos ! entonces enviaremos el email
    if( getUserToEmail && getUserToEmail != null && getUserToEmail != undefined ){

      const getIdUser: string = getUserToEmail.id.toString();
      
      //Ahora debemos encriptar el id para guardarlo en el JWT
      const cryptId: string = bcrypt.hashSync( getIdUser, 10 );
      const token: string = this.getJwtTokenForRecovery({ idUser : cryptId });

      const sendEmail = await this.emailService.sendEmailForRecovery(token, getUserToEmail);

      if( !sendEmail ){
        return new ApiTransactionResponse(null, EResponseCodes.FAIL, "No pudo ser enviado el email de recuperación");
      }

      return new ApiTransactionResponse(getUserToEmail, EResponseCodes.OK, "Email de recuperación enviado, se encontró usuario");
      
    }
    
    // if( bcrypt.compareSync(getIdUser, cryptId )){
    //   console.log("Hola")
    // }
    return new ApiTransactionResponse(null, EResponseCodes.FAIL, "No pudo ser enviado el email de recuperación, revise el email");

  }

  async recoveryChange(
      recoveryChangeUserDto: RecoveryChangeUserDto,
      token: string
  ): Promise<ApiTransactionResponse<IUser | null>> {

    //Decodificamos el JWT con base a la llave secreta
    const secret: string = this.configService.get<string>('JWT_SECRET');
    const decoded = jwt.verify(token, secret) as IUserDecodeToken;

    //Extraemos el id del usuario encriptado
    const user: string = decoded.idUser;
    
    //Paneamos el usuario compatible
    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder.where("user.status = true")
    const { entities } = await queryBuilder.getRawAndEntities();
    const userList: IUser[] = entities as IUser[];

    let capturedUser: IUser;
    for (const iter of userList) {
      if( bcrypt.compareSync(iter.id.toString(), user )){
        capturedUser = iter;
      }
    }

    if( !capturedUser || capturedUser == null || capturedUser == undefined )
      return new ApiTransactionResponse(null, EResponseCodes.FAIL, "El usuario no ha sido encontrado, es posible que también que haya sido inhabilitado, contacte con el admin.");

    //Si llegamos hasta acá procedemos a actualizar
    const { newPassword, verifyNewPassword } = recoveryChangeUserDto;

    if( newPassword != verifyNewPassword )
      return new ApiTransactionResponse(null, EResponseCodes.FAIL, "La nueva contraseña y su verificación deben coincidir.");

    const newCryptPass: string = bcrypt.hashSync( newPassword, 10 );

    const updateUser = await this.userRepository.preload({
      id: Number(capturedUser.id),
      password: newCryptPass,
      updateDateAt: new Date(),
    })

    await this.userRepository.save(updateUser);
      
    return new ApiTransactionResponse(
      updateUser,
      EResponseCodes.OK,
      "Contraseña cambiada correctamente."
    );

  }

  private getJwtToken( payload: IJwtPayload ){

    const token = this.jwtService.sign( payload );
    return token;

  }

  private getJwtTokenForRecovery( payload: IJwtPayloadRecovery ){

    const token = this.jwtService.sign( payload );
    return token;

  }

  async testingPrivateRoute(): Promise<ApiTransactionResponse<any>> {

    return new ApiTransactionResponse(null, EResponseCodes.INFO, "Saludos desde un método privado!");

  }

}
