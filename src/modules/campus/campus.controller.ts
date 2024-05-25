import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Campus } from './entities/campus.entity';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
         
import { CampusService } from './campus.service';
import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { ICampus } from './interfaces/campus.interfaces';
import { IPerson } from '../persons/interfaces/person.interfaces';
import { Auth } from '../auth/decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../auth/decorators/get-user.decorator';
import { IUser } from '../auth/interfaces/user.interface';

import { PageCampusDto } from './doc/PageCampusDto';
import { CampusResponse } from './doc/ResponseCampus';

@ApiTags("Módulo de Sede/Campus")
@ApiBearerAuth('access-token')  // Referencia al esquema de autenticación definido en main.ts
@Controller('campus')
export class CampusController {

  constructor(private readonly campusService: CampusService) {}

  @Post('/create')
  @Auth('CAMPUS')
  @ApiResponse({ status: 201, description: "Campus creado correctamente", type: CampusResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async create(
    @Body() createCampusDto: CreateCampusDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<ICampus | string>> {

    return this.campusService.create(createCampusDto, user);

  }

  @Get('/get-paginated')
  @Auth('CAMPUS')
  @ApiResponse({ status: 200, description: "Obteniendo el listado de Sedes", type: PageCampusDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener el listado de sedes" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<ICampus> | Object> {

    return this.campusService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('CAMPUS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la sede a obtener' })
  @ApiResponse({ status: 200, description: "Campus obtenido correctamente", type: CampusResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una sede" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<ICampus | string>> {

    return this.campusService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('CAMPUS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la sede a actualizar' })
  @ApiResponse({ status: 200, description: "Campus actualizado correctamente", type: CampusResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una sede para actualizarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async update(
    @Param('id') id: number, 
    @Body() updateCampusDto: UpdateCampusDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<ICampus | string>> {

    return this.campusService.update(id, updateCampusDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('CAMPUS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la sede a eliminar' })
  @ApiResponse({ status: 200, description: "Campus eliminado lógicamente correctamente", type: CampusResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una sede para eliminarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async remove(@Param('id') id: number): Promise<ApiTransactionResponse<ICampus | string>> {

    return this.campusService.remove(id);

  }

  @Get('/get-persons-by-campus/:id')
  @Auth('CAMPUS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la sede a ver sus personas' })
  @ApiResponse({ status: 200, description: "Campus actualizado correctamente", type: PageCampusDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una sede para ver sus personas" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findPersonsByCampus(
    @Param('id') id: number,
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPerson> | Object> {

    return this.campusService.findPersonsByCampus(id, pageOptionsDto);

  }

}
