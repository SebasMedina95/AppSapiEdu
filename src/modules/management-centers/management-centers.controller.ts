import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagementCentersService } from './management-centers.service';

import { CreateManagementCenterDto } from './dto/create-management-center.dto';
import { UpdateManagementCenterDto } from './dto/update-management-center.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';
import { PageDto } from '../../helpers/paginations/dto/page.dto';

import { IManagementCenter } from './interfaces/managements-centers.interfaces';
import { IUser } from '../auth/interfaces/user.interface';

import { ApiTransactionResponse } from '../../utils/ApiResponse';

import { ManagementCenterResponse } from './doc/ResponseManagementCenter';
import { PageManagementCenterDto } from './doc/PageManagementCenterDto';

import { Auth } from '../auth/decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../auth/decorators/get-user.decorator';

@ApiTags("Módulo de Centros Gestores")
@ApiBearerAuth('access-token')  // Referencia al esquema de autenticación definido en main.ts
@Controller('management-centers')
export class ManagementCentersController {
  
  constructor(private readonly managementCentersService: ManagementCentersService) {}

  @Post('/create')
  @Auth('MANAGEMENT_CENTERS')
  @ApiResponse({ status: 201, description: "Centro Gestor creado correctamente", type: ManagementCenterResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async create(
    @Body() createManagementCenterDto: CreateManagementCenterDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {

    return this.managementCentersService.create(createManagementCenterDto, user);

  }

  @Get('/get-paginated')
  @Auth('MANAGEMENT_CENTERS')
  @ApiResponse({ status: 200, description: "Obteniendo el listado de Centros Gestores", type: PageManagementCenterDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener el listado de Centros Gestores" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IManagementCenter> | Object> {

    return this.managementCentersService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('MANAGEMENT_CENTERS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id del Centro Gestor a obtener' })
  @ApiResponse({ status: 200, description: "Centro Gestor obtenido correctamente", type: ManagementCenterResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una sede" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {

    return this.managementCentersService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('MANAGEMENT_CENTERS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id del Centro Gestor a actualizar' })
  @ApiResponse({ status: 200, description: "Centro Gestor actualizado correctamente", type: ManagementCenterResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una sede para actualizarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  update(
    @Param('id') id: number, 
    @Body() updateManagementCenterDto: UpdateManagementCenterDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {

    return this.managementCentersService.update(id, updateManagementCenterDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('MANAGEMENT_CENTERS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la sede a eliminar' })
  @ApiResponse({ status: 200, description: "Campus eliminado lógicamente correctamente", type: ManagementCenterResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una sede para eliminarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async remove(
    @Param('id') id: number,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IManagementCenter | string>> {

    return this.managementCentersService.remove(id, user);

  }
}
