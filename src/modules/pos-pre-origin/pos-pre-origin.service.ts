import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePosPreOriginDto } from './dto/create-pos-pre-origin.dto';
import { UpdatePosPreOriginDto } from './dto/update-pos-pre-origin.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';
import { PageDto } from '../../helpers/paginations/dto/page.dto';
import { PageMetaDto } from '../../helpers/paginations/dto/page-meta.dto';

import { IUser } from '../auth/interfaces/user.interface';
import { IPosPreOrigen } from './interfaces/posiciones-presupuestales.interfaces';
import { IPerson } from '../persons/interfaces/person.interfaces';

import { ApiTransactionResponse } from '../../utils/ApiResponse';
import { EResponseCodes } from '../../constants/ResponseCodesEnum';
import { MySqlErrorsExceptions } from '../../helpers/exceptions-sql';

import { PosPreOrigin } from './entities/pos-pre-origin.entity';
import { Person } from '../persons/entities/person.entity';

@Injectable()
export class PosPreOriginService {

  private readonly logger = new Logger('ManagementCentersService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(
    @InjectRepository(PosPreOrigin) private readonly posPreOriginRepository: Repository<PosPreOrigin>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,
  ){}

  async create(
    createPosPreOriginDto: CreatePosPreOriginDto, 
    user: IUser
  ): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    try {
      
      const personUser: IPerson = user.person as IPerson;
      const registerPosPreSapi = this.posPreOriginRepository.create({
        createDocumentUserAt: personUser.document,
        createDateAt: new Date(),
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...createPosPreOriginDto
      });

      await this.posPreOriginRepository.save(registerPosPreSapi);

      return new ApiTransactionResponse(
        registerPosPreSapi,
        EResponseCodes.OK,
        "Posición Presupuestal de origen creada correctamente."
      );
      
    } catch (error) {

      this.logger.error(`${error}. No se pudo realizar el Registro de la Posición Presupuestal de Origen`);

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear la Posición Presupuestal de Origen."
      );
      
    } finally {

      this.logger.log("Registro de Posición Presupuestal de Origen");

    }

  }

  async findAll(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPosPreOrigen> | Object> {

    const queryBuilder = this.posPreOriginRepository.createQueryBuilder("posPreOrig");
      queryBuilder.where("posPreOrig.status = true");

      //* ************************* *//
      //* Apliquemos las relaciones *//
      //* ************************* *//
      queryBuilder.leftJoinAndSelect("posPreOrig.managementCenter", "managementCenter");

      queryBuilder.select([
        "posPreOrig",
        "managementCenter"
      ]);

      if( pageOptionsDto.search ){

        queryBuilder
          .andWhere("LOWER(posPreOrig.numberName) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(CAST(posPreOrig.exercise AS TEXT)) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(posPreOrig.denomination) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(posPreOrig.description) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(posPreOrig.createDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(posPreOrig.updateDocumentUserAt) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(managementCenter.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
          .orWhere("LOWER(managementCenter.description) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })

      }

      queryBuilder
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .orderBy("posPreOrig.id", pageOptionsDto.order);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    

  }

  async findOne(id: number): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    throw new Error("Metodo no implementado");

  }

  async update(
    id: number, 
    updatePosPreOriginDto: UpdatePosPreOriginDto, 
    user: IUser
  ): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    throw new Error("Metodo no implementado");

  }

  async remove(
    id: number, 
    user: IUser
  ): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    throw new Error("Metodo no implementado");

  }
}
