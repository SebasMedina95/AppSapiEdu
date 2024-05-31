import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ControlEntitiesService } from './control-entities.service';

import { CreateControlEntityDto } from './dto/create-control-entity.dto';
import { UpdateControlEntityDto } from './dto/update-control-entity.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { Auth } from '../auth/decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../auth/decorators/get-user.decorator';

import { ControlEntityResponse } from './doc/ResponseControlEntities';
import { PageControlEntityDto } from './doc/PageControlEntityDto';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { IControlEntity } from './interfaces/control-entity.interfaces';
import { IUser } from '../auth/interfaces/user.interface';

@ApiTags("Módulo de Entidades de Control")
@ApiBearerAuth('access-token')  // Referencia al esquema de autenticación definido en main.ts
@Controller('control-entities')
export class ControlEntitiesController {
  constructor(private readonly controlEntitiesService: ControlEntitiesService) {}

  @Post('/create')
  @Auth('CONTROL_ENTITIES')
  @ApiResponse({ status: 201, description: "Entidad de Control creada correctamente", type: ControlEntityResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async create(
    @Body() createControlEntityDto: CreateControlEntityDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    return this.controlEntitiesService.create(createControlEntityDto, user);

  }

  @Get('/get-paginated')
  @Auth('CONTROL_ENTITIES')
  @ApiResponse({ status: 200, description: "Obteniendo el listado de Entidades de Control", type: PageControlEntityDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener el listado de Entidades de Control" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IControlEntity> | Object> {

    return this.controlEntitiesService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('CONTROL_ENTITIES')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la entidad de control a obtener' })
  @ApiResponse({ status: 200, description: "Entidad de Control obtenida correctamente", type: ControlEntityResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una entidad de control" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    return this.controlEntitiesService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('CONTROL_ENTITIES')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la entidad de control a actualizar' })
  @ApiResponse({ status: 200, description: "Entidad de Control actualizada correctamente", type: ControlEntityResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una entidad de control para actualizarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async update(
    @Param('id') id: number, 
    @Body() updateControlEntityDto: UpdateControlEntityDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    return this.controlEntitiesService.update(id, updateControlEntityDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('CONTROL_ENTITIES')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la entidad de control a eliminar' })
  @ApiResponse({ status: 200, description: "Entidad de Control eliminada lógicamente correctamente", type: ControlEntityResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una entidad de control para eliminarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async remove(
    @Param('id') id: number,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IControlEntity | string>> {

    return this.controlEntitiesService.remove(id, user);

  }
}
