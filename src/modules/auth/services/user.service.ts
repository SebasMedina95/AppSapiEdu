import { Injectable,
         Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update/update-user.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';
import { PageMetaDto } from 'src/helpers/paginations/dto/page-meta.dto';

import { PermitAssignment } from '../entities/permit-assignment.entity';
import { User } from '../entities/user.entity';
import { Person } from 'src/modules/persons/entities/person.entity';
import { EmailService } from './email.service';

import { IEditUserWithUploadAvatarFile, IResponseTransactionBasic, IUser, IUserWithPermitions } from '../interfaces/user.interface';
import { IPerson } from 'src/modules/persons/interfaces/person.interfaces';

import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { ApiResponse } from 'src/utils/ApiResponse';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PermitAssignment) private readonly permitAssignmentRepository: Repository<PermitAssignment>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
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

      //Enviar email / Se valida el usuario:
      const queryBuilderForGetPersonToEmail = this.personRepository.createQueryBuilder("person");
      queryBuilderForGetPersonToEmail.where("person.id = :paramId" , { paramId : createUserDto.person });
      queryBuilderForGetPersonToEmail.getOne();
      const responseQueryBuilderForGetPersonToEmail = await queryBuilderForGetPerson.getRawAndEntities();
      const entitiesResponse = responseQueryBuilderForGetPersonToEmail.entities;
      const getPersonOfEntities: IPerson = entitiesResponse[0].person as IPerson;
      
      await this.emailService.sendEmailValidationUser(factoryResult.userResponse.id, 
                                                      getPersonOfEntities.email,
                                                      getPersonOfEntities.names,
                                                      getPersonOfEntities.lastNames,
                                                      createUserDto.user,
                                                      createUserDto.password);

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

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<IUser>> {

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

    if( pageOptionsDto.search ){

      queryBuilder
        .where("LOWER(person.document) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.names) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.lastNames) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.address) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.email) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.type) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(campus.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(user.user) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })

    }

    const itemCount = await queryBuilder.getCount();
    const responseQueryBuilder = await queryBuilder.getRawAndEntities();
    const entities = responseQueryBuilder.entities;

    queryBuilder
      .where("user.status = true")
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy("user.id", pageOptionsDto.order);

    
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);

  }

  async findOne(id: number): Promise<ApiResponse<IUser | string>> {
    
    try {
      
      const queryBuilder = this.userRepository.createQueryBuilder("user");

      //* ************************* *//
      //* Apliquemos las relaciones *//
      //* ************************* *//
      queryBuilder.leftJoinAndSelect("user.person", "person")
                  .leftJoinAndSelect("person.campus", "campus");
      queryBuilder.leftJoinAndSelect("user.permit", "permit")
                  .leftJoinAndSelect("permit.role", "roles");

      queryBuilder.select([
        "user",
        "person",
        "permit",
        "roles",
        "campus"
      ]);

      queryBuilder.where("user.id = :paramId" , { paramId : id });
      queryBuilder.getOne();

      const { entities } = await queryBuilder.getRawAndEntities();
      const result: IUser[] = entities as  IUser[];

      if( result.length === 0 ){

        return new ApiResponse(
          null,
          EResponseCodes.INFO,
          "Usuario no encontrado con el ID."
        );

      }else{

        delete result[0].password; //No devolvemos la contraseña

        return new ApiResponse(
          result[0],
          EResponseCodes.OK,
          "Usuario obtenido correctamente."
        );

      }

    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error al intentar encontrar a la persona por ID."
      );

    }

  }

  async update(data: IEditUserWithUploadAvatarFile): Promise<ApiResponse<IUser | string>> {

    try {

      //Encontremos primero el usuario por el ID
      const getUser: ApiResponse<string | IUser> = await this.findOne(Number(data.id));

      if( getUser.data == null )
        return new ApiResponse(null, EResponseCodes.FAIL, "El usuario no pudo ser encontrado.");

      const updateUser = await this.userRepository.preload({
        id: Number(data.id),
        user: data.user,
        password: bcrypt.hashSync( data.password, 10 ),
        avatar: data.avatar,
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
      })

      await this.userRepository.save(updateUser);

      return new ApiResponse(
        updateUser,
        EResponseCodes.OK,
        "Usuario actualizado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo actualizar el usuario."
      );
      
    }

  }

  async remove(id: number): Promise<ApiResponse<IUser | string>> {
    
    //Encontremos primero el usuario por el ID
    const getUser: ApiResponse<string | IUser> = await this.findOne(id);

    if( getUser.data == null )
      return new ApiResponse(null, EResponseCodes.FAIL, "El usuario no pudo ser encontrado.");

    //Ajustemos entonces el campo requerido
    const updateStatus = await this.userRepository.preload({
      id,
      updateDocumentUserAt: "123456789",
      updateDateAt: new Date(),
      status: false
    });

    await this.userRepository.save(updateStatus);

    return new ApiResponse(
      updateStatus,
      EResponseCodes.OK,
      "El usuario ha sido inhabilitado correctamente."
    );
    
  }

  async validateEmail(id: number): Promise<ApiResponse<boolean | string>> {

    //Encontremos primero el usuario por el ID
    const getUser: ApiResponse<string | IUser> = await this.findOne(id);

    if( getUser.data == null )
      return new ApiResponse(null, EResponseCodes.FAIL, "El usuario no pudo ser encontrado.");

    //Ajustemos entonces el campo requerido
    const updateValidEmail = await this.userRepository.preload({
        id,
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
        isValid: true
    });

    await this.userRepository.save(updateValidEmail);

    return new ApiResponse(
      true,
      EResponseCodes.OK,
      "Email de usuario validado correctamente."
    );

  }

}
