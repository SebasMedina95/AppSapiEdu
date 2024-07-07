import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PosPreSapiService } from './pos-pre-sapi.service';

import { CreatePosPreSapiDto } from './dto/create-pos-pre-sapi.dto';
import { UpdatePosPreSapiDto } from './dto/update-pos-pre-sapi.dto';
import { PageOptionsDto } from '../../helpers/paginations/dto/page-options.dto';
import { PageDto } from '../../helpers/paginations/dto/page.dto';

import { Auth } from '../auth/decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../auth/decorators/get-user.decorator';

import { IUser } from '../auth/interfaces/user.interface';
import { IPosPreSapi } from './interfaces/posiciones-presupuestales-sapi.interfaces';

import { ApiTransactionResponse } from '../../utils/ApiResponse';
import { PagePosPreSapiDto } from './doc/PagePosPreSapiDto';
import { PosPreSapiResponse } from './doc/ResponsePosPreSapi';

@ApiTags("Módulo de Posiciones Presupuestales SapiEdu")
@Controller('pos-pre-sapi')
export class PosPreSapiController {
  constructor(private readonly posPreSapiService: PosPreSapiService) {}

  @Post('/create')
  @Auth('POS_PRE_SAPI')
  @ApiResponse({ status: 201, description: "Posición Presupuestal Sapi creada correctamente", type: PosPreSapiResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async create(
    @Body() createPosPreSapiDto: CreatePosPreSapiDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {

    return this.posPreSapiService.create(createPosPreSapiDto, user);

  }

  @Get('/get-paginated')
  @Auth('POS_PRE_SAPI')
  @ApiResponse({ status: 200, description: "Obteniendo el listado de Posiciones Presupuestales Sapi", type: PagePosPreSapiDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener el listado de Posiciones Presupuestales de Origen" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPosPreSapi> | Object> {

    return this.posPreSapiService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('POS_PRE_SAPI')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la Posición Presupuestal Sapi a obtener' })
  @ApiResponse({ status: 200, description: "Posición Presupuestal Sapi obtenida correctamente", type: PosPreSapiResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una posición presupuestal Sapi" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {

    return this.posPreSapiService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('POS_PRE_SAPI')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la Posición Presupuestal Sapi a actualizar' })
  @ApiResponse({ status: 200, description: "Posición Presupuestal Sapi actualizado correctamente", type: PosPreSapiResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener un Posición Presupuestal Sapi para actualizarla" })
  async update(
    @Param('id') id: number, 
    @Body() updatePosPreSapiDto: UpdatePosPreSapiDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {

    return this.posPreSapiService.update(id, updatePosPreSapiDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('POS_PRE_SAPI')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la Posición Presupuestal Sapi a eliminar' })
  @ApiResponse({ status: 200, description: "Posición Presupuestal Sapi eliminada lógicamente correctamente", type: PosPreSapiResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una posición presupuestal Sapi para eliminarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  remove(
    @Param('id') id: number,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPosPreSapi | string>> {

    return this.posPreSapiService.remove(id, user);

  }
}
