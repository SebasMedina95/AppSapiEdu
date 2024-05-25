import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PersonsService } from './persons.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';

import { IPerson } from './interfaces/person.interfaces';
import { IUser } from '../auth/interfaces/user.interface';
import { Auth } from '../auth/decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../auth/decorators/get-user.decorator';

import { PersonResponse } from './doc/ResponsePerson';
import { PagePersonDto } from './doc/PagePersonDto';

@ApiTags("Módulo de Personas")
@Controller('persons')
export class PersonsController {

  constructor(private readonly personsService: PersonsService) {}

  @Post('/create')
  @Auth('PERSONS')
  @ApiResponse({ status: 201, description: "Persona creada correctamente", type: PersonResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async create(
    @Body() createPersonDto: CreatePersonDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.create(createPersonDto, user);

  }

  @Get('/get-paginated')
  @Auth('PERSONS')
  @ApiResponse({ status: 200, description: "Obteniendo el listado de personas", type: PagePersonDto })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener el listado de personas" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPerson>> {

    return this.personsService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('PERSONS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la persona a obtener' })
  @ApiResponse({ status: 200, description: "Persona obtenida correctamente", type: PersonResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una persona" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('PERSONS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la persona a actualizar' })
  @ApiResponse({ status: 200, description: "Persona actualizada correctamente", type: PersonResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una persona para actualizarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async update(
    @Param('id') id: number, 
    @Body() updatePersonDto: UpdatePersonDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.update(id, updatePersonDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('PERSONS')
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'Id de la persona a eliminar' })
  @ApiResponse({ status: 200, description: "Persona eliminada lógicamente correctamente", type: PersonResponse })
  @ApiResponse({ status: 400, description: "Problemas al intentar obtener una persona para eliminarla" })
  @ApiResponse({ status: 403, description: "No autorizado por vencimiento de Token" })
  async remove(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.remove(id);

  }
}
