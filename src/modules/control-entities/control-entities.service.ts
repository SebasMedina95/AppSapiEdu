import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateControlEntityDto } from './dto/create-control-entity.dto';
import { UpdateControlEntityDto } from './dto/update-control-entity.dto';

import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';
import { PageMetaDto } from 'src/helpers/paginations/dto/page-meta.dto';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';

import { IControlEntity } from './interfaces/control-entity.interfaces';
import { IUser } from '../auth/interfaces/user.interface';
import { IPerson } from '../persons/interfaces/person.interfaces';
import { ControlEntity } from './entities/control-entity.entity';

@Injectable()
export class ControlEntitiesService {

  private readonly logger = new Logger('CampusService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(
    @InjectRepository(ControlEntity) private readonly controlEntityRepository: Repository<ControlEntity>,
    private readonly dataSource: DataSource,
  ){}

  async create(
    createControlEntityDto: CreateControlEntityDto, 
    user: IUser
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    try {

      //Validemos no repetir el nombre

      const personUser: IPerson = user.person as IPerson;
      const registerControlEntity = this.controlEntityRepository.create({
        createDocumentUserAt: personUser.document,
        createDateAt: new Date(),
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...createControlEntityDto
      });

      await this.controlEntityRepository.save(registerControlEntity);

      return new ApiTransactionResponse(
        registerControlEntity,
        EResponseCodes.OK,
        "Entidad de Control creada correctamente."
      );
      
    } catch (error) {

      this.logger.error(`${error}. No se pudo realizar el Registro de la Entidad de Control`);
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear la entidad de control."
      );
      
    } finally {

      this.logger.log("Registro de Entidad de Control");

    }

  }

  async findAll(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IControlEntity> | Object> {

    try {
      
      const queryBuilder = this.controlEntityRepository.createQueryBuilder("controlEntity");
      queryBuilder.where("controlEntity.status = true")

      if( pageOptionsDto.search ){

        console.log({"pageOptionsDto.search ==> " : pageOptionsDto.search})

        queryBuilder
          .andWhere("LOWER(controlEntity.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(controlEntity.description) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(controlEntity.createDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(controlEntity.updateDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })

      }

      queryBuilder
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .orderBy("controlEntity.id", pageOptionsDto.order);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);

    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar listar las entidades de control."
      );

    }

  }

  async findOne(
    id: number
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    try {

      const queryBuilder = this.controlEntityRepository.createQueryBuilder("controlEntity");
      queryBuilder.where("controlEntity.id = :paramId" , { paramId : id });
      queryBuilder.andWhere("controlEntity.status = true")
      queryBuilder.getOne();

      const { entities } = await queryBuilder.getRawAndEntities();
      const result: IControlEntity[] = entities as  IControlEntity[];

      if( result.length === 0 ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Entidad de Control no encontrada con el ID."
        );

      }else{

        return new ApiTransactionResponse(
          result[0],
          EResponseCodes.OK,
          "Entidad de Control obtenida correctamente."
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

  async update(
    id: number, 
    updateControlEntityDto: UpdateControlEntityDto, 
    user: IUser
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    try {

      const personUser: IPerson = user.person as IPerson;
      const getControlEntity = await this.findOne(id);
      
      if( getControlEntity.data == null || !getControlEntity.data ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Entidad de control no encontrada con el ID."
        );

      }

      const updateControlEntity = await this.controlEntityRepository.preload({
        id,
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...updateControlEntityDto
      });

      await this.controlEntityRepository.save(updateControlEntity);

      return new ApiTransactionResponse(
        updateControlEntity,
        EResponseCodes.OK,
        "Entidad de control actualizado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar actualizar la entidad de control."
      );
      
    }

  }

  async remove(
    id: number,
    user: IUser
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    try {

      const personUser: IPerson = user.person as IPerson;
      const getControlEntity = await this.findOne(id);
      
      if( getControlEntity.data == null || !getControlEntity.data ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Entidad de control no encontrada con el ID."
        );

      }

      const updateControlEntity = await this.controlEntityRepository.preload({
        id,
        status: false,
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date()
      })

      await this.controlEntityRepository.save(updateControlEntity);

      return new ApiTransactionResponse(
        updateControlEntity,
        EResponseCodes.OK,
        "Entidad de control eliminada correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar eliminar lógicamente la entidad de control."
      );
      
    }

  }
}
