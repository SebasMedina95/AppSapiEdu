import { Injectable,
         Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update/update-user.dto';

import { PermitAssignment } from '../entities/permit-assignment.entity';
import { User } from '../entities/user.entity';

import { IResponseTransactionBasic, IUser, IUserWithPermitions } from '../interfaces/user.interface';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { ApiResponse } from 'src/utils/ApiResponse';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';
import { EmailService } from './email.service';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PermitAssignment) private readonly permitAssignmentRepository: Repository<PermitAssignment>,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,

  ){}

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<IResponseTransactionBasic | string>> {
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      //Validamos primero porque un usuario solo pertenece a una persona y una persona solo puede tener un usuario
      const queryBuilderForGetPerson = this.userRepository.createQueryBuilder("user");
      queryBuilderForGetPerson.leftJoinAndSelect("user.person", "person");
      queryBuilderForGetPerson.select([ "user", "person" ]);
      queryBuilderForGetPerson.where("user.person = :paramId" , { paramId : createUserDto.person });
      queryBuilderForGetPerson.getOne();
      const { entities } = await queryBuilderForGetPerson.getRawAndEntities();
      const entitiesUnk = entities as unknown;
      const entitiesForGetPerson = entitiesUnk as IUser[];

      if( entitiesForGetPerson && entitiesForGetPerson.length != 0 )
        return new ApiResponse(null, EResponseCodes.FAIL, `La persona determinada ya tiene un usuario creado (${entitiesForGetPerson[0].user}).`);
     
      //Construcción de objeto usuario para insersión
      //Realizamos la primera parte que es insertar al usuario
      const resUser = this.userRepository.create({ 
        user: createUserDto.user,
        password: bcrypt.hashSync( createUserDto.password, 10 ),
        createDocumentUserAt: "123456789",
        createDateAt: new Date(),
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
        person: createUserDto.person
      });

      await this.userRepository.save(resUser);
      delete resUser.password;

      //Si hay error cancelo la operación
      if( !resUser ) {
        await queryRunner.rollbackTransaction();
        return new ApiResponse(null, EResponseCodes.FAIL, "Fallo la transacción de creación.");
      }

      //Si pasa el proceso anterior, ahora registramos los roles del usuario
      const transactionsForPermitions: IUserWithPermitions[] = [];

      for (const rolesTrx of createUserDto.permit) {

        const objSubTransaction: IUserWithPermitions = {
          createDocumentUserAt: "123456789",
          createDateAt: new Date(),
          role: Number(rolesTrx),
          user: Number(resUser.id)
        }

        const resPermitions = this.permitAssignmentRepository.create({ ...objSubTransaction });
        transactionsForPermitions.push(resPermitions as IUserWithPermitions)
        await this.permitAssignmentRepository.save(resPermitions);

      }

      //Genero la transacción completa
      await queryRunner.commitTransaction();

      const factoryResult: IResponseTransactionBasic = {
        userResponse: resUser,
        permitionsResponse: transactionsForPermitions as IUserWithPermitions[]
      }

      //Enviar email:
      await this.emailService.sendEmailValidationUser(factoryResult.userResponse.id);

      return new ApiResponse(factoryResult, EResponseCodes.OK, "Usuario creado correctamente.");
      
    } catch (error) {

      this.logger.error(`${error}, realizando Rollback`);
      await queryRunner.rollbackTransaction();

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear el usuario."
      );

    } finally {

      this.logger.warn("Transacción de Usuarios");
      await queryRunner.release();

    }
    
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
