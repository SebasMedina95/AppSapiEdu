import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';
import { PageMetaDto } from 'src/helpers/paginations/dto/page-meta.dto';

import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { ApiResponse } from 'src/utils/ApiResponse';

import { Person } from './entities/person.entity';

import { IPerson } from './interfaces/person.interfaces';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';

@Injectable()
export class PersonsService {

  private readonly logger = new Logger('PersonsService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,

  ){}

  async create(createPersonDto: CreatePersonDto): Promise<ApiResponse<IPerson | string>> {
    
    try {

      const createPerson = this.personRepository.create({ 
        createDocumentUserAt: "123456789",
        createDateAt: new Date(),
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
        ...createPersonDto
      });
      await this.personRepository.save(createPerson);
      
      return new ApiResponse(
        createPerson,
        EResponseCodes.OK,
        "Persona creada correctamente."
      );
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
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

  async findOne(id: number): Promise<ApiResponse<IPerson | string>> {
    
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

        return new ApiResponse(
          null,
          EResponseCodes.INFO,
          "Persona no encontrada con el ID."
        );

      }else{

        return new ApiResponse(
          result[0],
          EResponseCodes.OK,
          "Persona obtenida correctamente."
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

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<ApiResponse<IPerson | string>> {
    
    try {
      
      const getPerson = await this.findOne(id);
      
      if( getPerson.data == null ){

        return new ApiResponse(
          null,
          EResponseCodes.INFO,
          "Persona no encontrada con el ID."
        );

      }

      const updatePerson = await this.personRepository.preload({
        id,
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
        ...updatePersonDto
      })

      await this.personRepository.save(updatePerson);

      return new ApiResponse(
        updatePerson,
        EResponseCodes.OK,
        "Persona actualizada correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo actualizar la persona."
      );
      
    }
    
  }

  async remove(id: number): Promise<ApiResponse<IPerson | string>> {
    
    try {
      
      const getPerson = await this.findOne(id);
      
      if( getPerson.data == null ){

        return new ApiResponse(
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

      return new ApiResponse(
        updatePerson,
        EResponseCodes.OK,
        "Persona eliminada correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo eliminar lógicamente a la persona."
      );
      
    }
    
  }
}
