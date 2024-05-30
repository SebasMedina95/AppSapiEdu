import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateControlEntityDto } from './dto/create-control-entity.dto';
import { UpdateControlEntityDto } from './dto/update-control-entity.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';

import { IControlEntity } from './interfaces/control-entity.interfaces';
import { IUser } from '../auth/interfaces/user.interface';
import { IPerson } from '../persons/interfaces/person.interfaces';
import { ControlEntity } from './entities/control-entity.entity';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';

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

    return new ApiTransactionResponse("findAll", EResponseCodes.INFO, "Información desde findAll");

  }

  async findOne(
    id: number
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    return new ApiTransactionResponse("findOne", EResponseCodes.INFO, "Información desde findOne");
    
  }

  async update(
    id: number, 
    updateControlEntityDto: UpdateControlEntityDto, 
    user: IUser
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    return new ApiTransactionResponse("update", EResponseCodes.INFO, "Información desde update");

  }

  async remove(
    id: number
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    return new ApiTransactionResponse("remove", EResponseCodes.INFO, "Información desde remove");

  }
}
