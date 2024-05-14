import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { Campus } from './entities/campus.entity';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { ICampus } from './interfaces/campus.interfaces';
import { EResponseCodes } from 'src/constants/ResponseCodesEnum';
import { ApiResponse } from 'src/utils/ApiResponse';

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

  findAll() {
    return `This action returns all campus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campus`;
  }

  update(id: number, updateCampusDto: UpdateCampusDto) {
    return `This action updates a #${id} campus`;
  }

  remove(id: number) {
    return `This action removes a #${id} campus`;
  }
}
