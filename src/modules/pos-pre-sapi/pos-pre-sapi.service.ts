import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePosPreSapiDto } from './dto/create-pos-pre-sapi.dto';
import { UpdatePosPreSapiDto } from './dto/update-pos-pre-sapi.dto';
import { PageDto } from '../../helpers/paginations/dto/page.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';

import { MySqlErrorsExceptions } from '../../helpers/exceptions-sql';

import { PosPreSapi } from './entities/pos-pre-sapi.entity';
import { PosPreOrigin } from '../pos-pre-origin/entities/pos-pre-origin.entity';
import { Person } from '../persons/entities/person.entity';

import { ApiTransactionResponse } from '../../utils/ApiResponse';
import { EResponseCodes } from '../../constants/ResponseCodesEnum';

import { IUser } from '../auth/interfaces/user.interface';
import { IPosPreSapi } from './interfaces/posiciones-presupuestales-sapi.interfaces';
import { IPerson } from '../persons/interfaces/person.interfaces';

@Injectable()
export class PosPreSapiService {

  private readonly logger = new Logger('PosPreSapiService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(
    @InjectRepository(PosPreSapi) private readonly posPreSapiRepository: Repository<PosPreSapi>,
    @InjectRepository(PosPreOrigin) private readonly posPreOriginRepository: Repository<PosPreOrigin>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,
  ){}

  async create(
    createPosPreSapiDto: CreatePosPreSapiDto,
    user: IUser
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {
    
    try {
      
      const personUser: IPerson = user.person as IPerson;

      //Verificamos la posición presupuestal Sapi
      const getPosPreOrig = await this.posPreOriginRepository.findOne({
        where: { id: Number(createPosPreSapiDto.posPreOrigin) }
      });

      if( !getPosPreOrig || getPosPreOrig == undefined || getPosPreOrig == null ){
        return new ApiTransactionResponse(
          null,
          EResponseCodes.FAIL,
          "La posición presupuestal sapi que está intentando aplicar no es válida."
        );
      }

      //Calculemos el número del pos pre sapi:
      const getNumberPosPreOrig: string = getPosPreOrig.numberName;
      const valNumberPosPreSapi: string = `${getNumberPosPreOrig}-${createPosPreSapiDto.consecutive}`;

      //Validemos que el valor calculado no se repita
      const getPosPreSapiByNumber = await this.posPreSapiRepository.findOne({
        where: { numberName: valNumberPosPreSapi }
      });

      if(getPosPreSapiByNumber || getPosPreSapiByNumber != null || getPosPreSapiByNumber != undefined){
        return new ApiTransactionResponse(
          null,
          EResponseCodes.FAIL,
          "El número de posición presupuestal sapi ya se encuentra registrado."
        );
      }

      //Ya ajustamos y agregamos a la base de datos
      const registerPosPreSapi = this.posPreSapiRepository.create({
        numberName: valNumberPosPreSapi,
        createDocumentUserAt: personUser.document,
        createDateAt: new Date(),
        updateDocumentUserAt: personUser.document,
        updateDateAt: new Date(),
        ...createPosPreSapiDto
      });

      await this.posPreSapiRepository.save(registerPosPreSapi);

      return new ApiTransactionResponse(
        registerPosPreSapi,
        EResponseCodes.OK,
        "Posición Presupuestal Sapi creada correctamente."
      );

      
    } catch (error) {

      this.logger.error(`${error}. No se pudo realizar el Registro de la Posición Presupuestal Sapi`);

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiTransactionResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear la Posición Presupuestal Sapi."
      );
      
    } finally {

      this.logger.log("Registro de Posición Presupuestal Sapi");

    }

  }

  async findAll(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPosPreSapi> | Object> {

    throw new Error("En Implementación ...");

  }

  async findOne(
    id: number
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {

    throw new Error("En Implementación ...");

  }

  async update(
    id: number, 
    updatePosPreSapiDto: UpdatePosPreSapiDto,
    user: IUser
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {

    throw new Error("En Implementación ...");

  }

  async remove(
    id: number,
    user: IUser
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {

    throw new Error("En Implementación ...");

  }
}
