import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePosPreSapiDto } from './dto/create-pos-pre-sapi.dto';
import { UpdatePosPreSapiDto } from './dto/update-pos-pre-sapi.dto';
import { PageDto } from '../../helpers/paginations/dto/page.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';

import { MySqlErrorsExceptions } from '../../helpers/exceptions-sql';

import { PosPreSapi } from './entities/pos-pre-sapi.entity';
import { Person } from '../persons/entities/person.entity';

import { ApiTransactionResponse } from '../../utils/ApiResponse';
import { IUser } from '../auth/interfaces/user.interface';
import { IPosPreSapi } from './interfaces/posiciones-presupuestales-sapi.interfaces';

@Injectable()
export class PosPreSapiService {

  private readonly logger = new Logger('PosPreSapiService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(
    @InjectRepository(PosPreSapi) private readonly posPreSapiRepository: Repository<PosPreSapi>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,
  ){}

  async create(
    createPosPreSapiDto: CreatePosPreSapiDto,
    user: IUser
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {
    
    throw new Error("En Implementación ...");

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
