import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PosPreOriginService } from './pos-pre-origin.service';

import { CreatePosPreOriginDto } from './dto/create-pos-pre-origin.dto';
import { UpdatePosPreOriginDto } from './dto/update-pos-pre-origin.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';
import { PageDto } from '../../helpers/paginations/dto/page.dto';

import { IUser } from '../auth/interfaces/user.interface';
import { IPosPreOrigen } from './interfaces/posiciones-presupuestales.interfaces';

import { Auth } from '../auth/decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../auth/decorators/get-user.decorator';

import { ApiTransactionResponse } from '../../utils/ApiResponse';
import { PagePosPreOrignDto } from './doc/PagePosPreOrigDto';
import { PosPreOrigResponse } from './doc/ResponsePosPreOrig';

@ApiTags("Módulo de Posiciones Presupuestales de Origen")
@Controller('pos-pre-origin')
export class PosPreOriginController {

  constructor(private readonly posPreOriginService: PosPreOriginService) {}

  @Post('/create')
  @Auth('POS_PRE_ORIGIN')
  @ApiResponse({ status: 201, description: "Posición Presupuestal de Origen creada correctamente", type: PosPreOrigResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async create(
    @Body() createPosPreOriginDto: CreatePosPreOriginDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    return this.posPreOriginService.create(createPosPreOriginDto, user);

  }

  @Get('/get-paginated')
  @Auth('POS_PRE_ORIGIN')
  @ApiResponse({ status: 200, description: "Obteniendo el listado de Posiciones Presupuestales de Origen", type: PagePosPreOrignDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener el listado de Posiciones Presupuestales de Origen" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPosPreOrigen> | Object> {

    return this.posPreOriginService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('POS_PRE_ORIGIN')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la Posición Presupuestal de Origen a obtener' })
  @ApiResponse({ status: 200, description: "Posición Presupuestal de Origen obtenida correctamente", type: PosPreOrigResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una posición presupuestal de origen" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    return this.posPreOriginService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('POS_PRE_ORIGIN')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la Posición Presupuestal de Origen a actualizar' })
  @ApiResponse({ status: 200, description: "Posición Presupuestal de Origen actualizado correctamente", type: PosPreOrigResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener un Posición Presupuestal de Origen para actualizarla" })
  async update(
    @Param('id') id: number, 
    @Body() updatePosPreOriginDto: UpdatePosPreOriginDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    return this.posPreOriginService.update(id, updatePosPreOriginDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('POS_PRE_ORIGIN')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la Posición Presupuestal de Origen a eliminar' })
  @ApiResponse({ status: 200, description: "Posición Presupuestal de Origen eliminada lógicamente correctamente", type: PosPreOrigResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una posición presupuestal de origen para eliminarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async remove(
    @Param('id') id: number,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPosPreOrigen | string>> {

    return this.posPreOriginService.remove(id, user);

  }
}
