import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateManagementCenterDto } from './dto/create-management-center.dto';
import { UpdateManagementCenterDto } from './dto/update-management-center.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';
import { PageMetaDto } from '../../helpers/paginations/dto/page-meta.dto';

import { MySqlErrorsExceptions } from '../../helpers/exceptions-sql';

import { ApiTransactionResponse } from '../../utils/ApiResponse';
import { EResponseCodes } from '../../constants/ResponseCodesEnum';

import { IManagementCenter } from './interfaces/managements-centers.interfaces';
import { IUser } from '../auth/interfaces/user.interface';
import { IPerson } from '../persons/interfaces/person.interfaces';

import { ManagementCenter } from './entities/management-center.entity';
import { Person } from '../persons/entities/person.entity';

@Injectable()
export class ManagementCentersService {

  private readonly logger = new Logger('ManagementCentersService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(
    @InjectRepository(ManagementCenter) private readonly managementCenterRepository: Repository<ManagementCenter>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,
  ){}

  async create(
    createManagementCenterDto: CreateManagementCenterDto, 
    user: IUser
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {

    try {

      const personUser: IPerson = user.person as IPerson;
      const registerManagementCenter = this.managementCenterRepository.create({
        createDocumentUserAt: personUser.document,
        createDateAt: new Date(),
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...createManagementCenterDto
      });

      await this.managementCenterRepository.save(registerManagementCenter);

      return new ApiTransactionResponse(
        registerManagementCenter,
        EResponseCodes.OK,
        "Centro gestor creado correctamente."
      );
      
    } catch (error) {

      this.logger.error(`${error}. No se pudo realizar el Registro del Centro Gestor`);

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear el centro gestor."
      );
      
    } finally {

      this.logger.log("Registro de Centro Gestor");

    }

  }

  async findAll(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IManagementCenter> | Object> {

    try {

      const queryBuilder = this.managementCenterRepository.createQueryBuilder("managementCenter");
      queryBuilder.where("managementCenter.status = true")

      if( pageOptionsDto.search ){

        queryBuilder
          .andWhere("LOWER(managementCenter.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(managementCenter.description) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(managementCenter.createDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(managementCenter.updateDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })

      }

      queryBuilder
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .orderBy("managementCenter.id", pageOptionsDto.order);

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

  async findOne(
    id: number
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {

    try {

      const queryBuilder = this.managementCenterRepository.createQueryBuilder("centroGestor");
      queryBuilder.where("centroGestor.id = :paramId" , { paramId : id });
      queryBuilder.andWhere("centroGestor.status = true")
      queryBuilder.getOne();

      const { entities } = await queryBuilder.getRawAndEntities();
      const result: IManagementCenter[] = entities as  IManagementCenter[];

      if( result.length === 0 ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Centro Gestor no encontrada con el ID."
        );

      }else{

        return new ApiTransactionResponse(
          result[0],
          EResponseCodes.OK,
          "Centro Gestor obtenido correctamente."
        );

      }
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar encontrar el centro gestor."
      );
      
    }

  }

  async update(
    id: number, 
    updateManagementCenterDto: UpdateManagementCenterDto,
    user: IUser
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {

    try {

      const personUser: IPerson = user.person as IPerson;
      const getManagementCenter = await this.findOne(id);
      
      if( getManagementCenter.data == null || !getManagementCenter.data ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Centro Gestor no encontrada con el ID."
        );

      }

      const updateManagementCenter = await this.managementCenterRepository.preload({
        id,
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...updateManagementCenterDto
      });

      await this.managementCenterRepository.save(updateManagementCenter);

      return new ApiTransactionResponse(
        updateManagementCenter,
        EResponseCodes.OK,
        "Centro Gestor actualizado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar actualizar el Centro Gestor."
      );
      
    }

  }

  async remove(
    id: number,
    user: IUser
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {
    
    try {

      const personUser: IPerson = user.person as IPerson;
      const getManagementCenter = await this.findOne(id);
      
      if( getManagementCenter.data == null || !getManagementCenter.data ){

        return new ApiTransactionResponse(
          null,
          EResponseCodes.INFO,
          "Centro Gestor no encontrada con el ID."
        );

      }

      const updateManagementCenter = await this.managementCenterRepository.preload({
        id,
        status: false,
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date()
      })

      await this.managementCenterRepository.save(updateManagementCenter);

      return new ApiTransactionResponse(
        updateManagementCenter,
        EResponseCodes.OK,
        "Centro Gestor eliminado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar eliminar lógicamente la Centro Gestor."
      );
      
    }
    
  }
}
