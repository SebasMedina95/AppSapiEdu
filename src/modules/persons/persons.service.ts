import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';
import { PageMetaDto } from 'src/helpers/paginations/dto/page-meta.dto';

import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { ApiTransactionResponse } from 'src/utils/ApiResponse';

import { Person } from './entities/person.entity';

import { IPerson } from './interfaces/person.interfaces';
import { IUser } from '../auth/interfaces/user.interface';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';

@Injectable()
export class PersonsService {

  private readonly logger = new Logger('PersonsService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,

  ){}

  async create(createPersonDto: CreatePersonDto, user: IUser): Promise<ApiTransactionResponse<IPerson | string>> {
    
    try {

      const personUser: IPerson = user.person as IPerson;
      const createPerson = this.personRepository.create({ 
        createDocumentUserAt: personUser.document,
        createDateAt: new Date(),
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...createPersonDto
      });
      await this.personRepository.save(createPerson);
      
      return new ApiTransactionResponse(
        createPerson,
        EResponseCodes.OK,
        "Persona creada correctamente."
      );
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear la persona."
      );

    }
    
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<IPerson>> {
    
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
        .where("LOWER(person.document) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.names) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.lastNames) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.address) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.email) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.phone) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.address) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(person.type) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
        .orWhere("LOWER(campus.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })

    }

    queryBuilder
      .where("person.status = true")
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy("person.id", pageOptionsDto.order);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
    
  }

  async findOne(id: number): Promise<ApiTransactionResponse<IPerson | string>> {
    
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

      queryBuilder.where("person.id = :paramId" , { paramId : id });
      queryBuilder.getOne();

      const { entities } = await queryBuilder.getRawAndEntities();
      const result: IPerson[] = entities as  IPerson[];

      if( result.length === 0 ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Persona no encontrada con el ID."
        );

      }else{

        return new ApiTransactionResponse(
          result[0],
          EResponseCodes.OK,
          "Persona obtenida correctamente."
        );

      }

    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error al intentar encontrar a la persona por ID."
      );

    }
    
  }

  async update(id: number, updatePersonDto: UpdatePersonDto, user: IUser): Promise<ApiTransactionResponse<IPerson | string>> {
    
    try {
      
      const personUser: IPerson = user.person as IPerson;
      const getPerson = await this.findOne(id);
      
      if( getPerson.data == null ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Persona no encontrada con el ID."
        );

      }

      const updatePerson = await this.personRepository.preload({
        id,
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...updatePersonDto
      })

      await this.personRepository.save(updatePerson);

      return new ApiTransactionResponse(
        updatePerson,
        EResponseCodes.OK,
        "Persona actualizada correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo actualizar la persona."
      );
      
    }
    
  }

  async remove(id: number): Promise<ApiTransactionResponse<IPerson | string>> {
    
    try {
      
      const getPerson = await this.findOne(id);
      
      if( getPerson.data == null ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Persona no encontrada con el ID."
        );

      }

      const updatePerson = await this.personRepository.preload({
        id,
        status: false,
        updateDateAt: new Date()
      })

      await this.personRepository.save(updatePerson);

      return new ApiTransactionResponse(
        updatePerson,
        EResponseCodes.OK,
        "Persona eliminada correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo eliminar lógicamente a la persona."
      );
      
    }
    
  }
}
