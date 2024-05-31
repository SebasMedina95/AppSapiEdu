import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

import { Campus } from './entities/campus.entity';
import { Person } from '../persons/entities/person.entity';

import { EResponseCodes } from 'src/constants/ResponseCodesEnum';
import { ApiTransactionResponse } from 'src/utils/ApiResponse';

import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { PageMetaDto } from 'src/helpers/paginations/dto/page-meta.dto';

import { ICampus } from './interfaces/campus.interfaces';
import { IPerson } from '../persons/interfaces/person.interfaces';
import { IUser } from '../auth/interfaces/user.interface';
@Injectable()
export class CampusService {

  private readonly logger = new Logger('CampusService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(
    @InjectRepository(Campus) private readonly campusRepository: Repository<Campus>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,
  ){}

  async create(createCampusDto: CreateCampusDto, user: IUser): Promise<ApiTransactionResponse<ICampus | string>> {
    
    try {

      const personUser: IPerson = user.person as IPerson;
      const registerCampus = this.campusRepository.create({
        createDocumentUserAt: personUser.document,
        createDateAt: new Date(),
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...createCampusDto
      });

      await this.campusRepository.save(registerCampus);

      return new ApiTransactionResponse(
        registerCampus,
        EResponseCodes.OK,
        "Campus creado correctamente."
      );
      
    } catch (error) {

      this.logger.error(`${error}. No se pudo realizar el Registro de Campus`);
      
    } finally {

      this.logger.log("Registro de Campus");

    }
    
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ICampus> | Object> {
    
    try {

      const queryBuilder = this.campusRepository.createQueryBuilder("campus");
      queryBuilder.where("campus.status = true")

      if( pageOptionsDto.search ){

        queryBuilder
          .andWhere("LOWER(campus.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.address) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.phone1) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.phone2) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.email1) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.email2) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.description) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.createDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.updateDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })

      }

      queryBuilder
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .orderBy("campus.id", pageOptionsDto.order);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar listar las sedes/campus."
      );

    }
    
  }

  async findOne(id: number): Promise<ApiTransactionResponse<ICampus | string>> {
    
    try {

      const queryBuilder = this.campusRepository.createQueryBuilder("campus");
      queryBuilder.where("campus.id = :paramId" , { paramId : id });
      queryBuilder.andWhere("campus.status = true")
      queryBuilder.getOne();

      const { entities } = await queryBuilder.getRawAndEntities();
      const result: ICampus[] = entities as  ICampus[];

      if( result.length === 0 ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Campus/Sede no encontrada con el ID."
        );

      }else{

        return new ApiTransactionResponse(
          result[0],
          EResponseCodes.OK,
          "Campus/Sede obtenida correctamente."
        );

      }
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar encontrar la sede/campus."
      );
      
    }
    
  }

  async update(id: number, updateCampusDto: UpdateCampusDto, user: IUser): Promise<ApiTransactionResponse<ICampus | string>> {
    
    try {

      const personUser: IPerson = user.person as IPerson;
      const getCampus = await this.findOne(id);
      
      if( getCampus.data == null || !getCampus.data ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Sede/Campus no encontrada con el ID."
        );

      }

      const updateCampus = await this.campusRepository.preload({
        id,
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...updateCampusDto
      });

      await this.campusRepository.save(updateCampus);

      return new ApiTransactionResponse(
        updateCampus,
        EResponseCodes.OK,
        "Sede/Campus actualizado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar actualizar la sede/campus."
      );
      
    }

  }

  async remove(
    id: number, 
    user: IUser
  ): Promise<ApiTransactionResponse<ICampus | string>> {
    
    try {

      const personUser: IPerson = user.person as IPerson;
      const getCampus = await this.findOne(id);
      
      if( getCampus.data == null || !getCampus.data ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Sede/Campus no encontrada con el ID."
        );

      }

      const updateCampus = await this.campusRepository.preload({
        id,
        status: false,
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date()
      })

      await this.campusRepository.save(updateCampus);

      return new ApiTransactionResponse(
        updateCampus,
        EResponseCodes.OK,
        "Sede/Campus eliminado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar eliminar lógicamente la sede/campus."
      );
      
    }
    
  }

  async findPersonsByCampus(id:number, pageOptionsDto: PageOptionsDto): Promise<PageDto<IPerson> | Object> {

    try {

      const queryBuilder = this.personRepository.createQueryBuilder("person");

      //* ************************* *//
      //* Apliquemos las relaciones *//
      //* ************************* *//
      queryBuilder.leftJoinAndSelect("person.campus", "campus");

      queryBuilder.select([
        "person",
        "campus"
      ]);

      if( pageOptionsDto.search ){

        queryBuilder
          //Campus/Sede
          .where("LOWER(campus.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.address) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.phone1) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.phone2) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.email1) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.email2) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.description) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.createDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(campus.updateDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          //Personas
          .orWhere("LOWER(person.document) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(person.names) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(person.lastNames) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(person.email) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })

      }

      queryBuilder
        .where("person.status = true")
        .andWhere("campus.id = :paramId" , { paramId : id })
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .orderBy("campus.id", pageOptionsDto.order);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar listar las sedes/campus."
      );

    }

  }

}
