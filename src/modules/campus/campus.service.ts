import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { Campus } from './entities/campus.entity';

import { EResponseCodes } from 'src/constants/ResponseCodesEnum';
import { ApiResponse } from 'src/utils/ApiResponse';

import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { PageMetaDto } from 'src/helpers/paginations/dto/page-meta.dto';

import { ICampus } from './interfaces/campus.interfaces';
@Injectable()
export class CampusService {

  private readonly logger = new Logger('CampusService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(
    @InjectRepository(Campus) private readonly campusRepository: Repository<Campus>,
    private readonly dataSource: DataSource,
  ){}

  async create(createCampusDto: CreateCampusDto): Promise<ApiResponse<ICampus | string>> {
    
    try {

      const registerCampus = this.campusRepository.create({
        createDocumentUserAt: "123456789",
        createDateAt: new Date(),
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
        ...createCampusDto
      });

      await this.campusRepository.save(registerCampus);

      return new ApiResponse(
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
          .where("LOWER(campus.name) LIKE :param", { param: '%' + pageOptionsDto.search + '%' })
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
        .where("campus.status = true")
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .orderBy("campus.id", pageOptionsDto.order);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar listar las sedes/campus."
      );

    }
    
  }

  async findOne(id: number): Promise<ApiResponse<ICampus | string>> {
    
    try {

      const queryBuilder = this.campusRepository.createQueryBuilder("campus");
      queryBuilder.where("campus.id = :paramId" , { paramId : id });
      queryBuilder.andWhere("campus.status = true")
      queryBuilder.getOne();

      const { entities } = await queryBuilder.getRawAndEntities();
      const result: ICampus[] = entities as  ICampus[];

      if( result.length === 0 ){

        return new ApiResponse(
          null,
          EResponseCodes.INFO,
          "Campus/Sede no encontrada con el ID."
        );

      }else{

        return new ApiResponse(
          result[0],
          EResponseCodes.OK,
          "Campus/Sede obtenida correctamente."
        );

      }
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar encontrar la sede/campus."
      );
      
    }
    
  }

  async update(id: number, updateCampusDto: UpdateCampusDto): Promise<ApiResponse<ICampus | string>> {
    
    try {

      const getCampus = await this.findOne(id);
      
      if( getCampus.data == null || !getCampus.data ){

        return new ApiResponse(
          null,
          EResponseCodes.INFO,
          "Sede/Campus no encontrada con el ID."
        );

      }

      const updateCampus = await this.campusRepository.preload({
        id,
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date(),
        ...updateCampusDto
      });

      await this.campusRepository.save(updateCampus);

      return new ApiResponse(
        updateCampus,
        EResponseCodes.OK,
        "Sede/Campus actualizado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar actualizar la sede/campus."
      );
      
    }

  }

  async remove(id: number): Promise<ApiResponse<ICampus | string>> {
    
    try {

      const getCampus = await this.findOne(id);
      
      if( getCampus.data == null || !getCampus.data ){

        return new ApiResponse(
          null,
          EResponseCodes.INFO,
          "Sede/Campus no encontrada con el ID."
        );

      }

      const updateCampus = await this.campusRepository.preload({
        id,
        status: false,
        updateDocumentUserAt: "123456789",
        updateDateAt: new Date()
      })

      await this.campusRepository.save(updateCampus);

      return new ApiResponse(
        updateCampus,
        EResponseCodes.OK,
        "Sede/Campus eliminado correctamente."
      );
      
    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "Ocurrió un error a intentar eliminar lógicamente la sede/campus."
      );
      
    }
    
  }
}
