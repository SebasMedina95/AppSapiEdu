import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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

@ApiTags("Módulo de Personas")
@Controller('persons')
export class PersonsController {

  constructor(private readonly personsService: PersonsService) {}

  @Post('/create')
  @Auth('PERSONS')
  create(
    @Body() createPersonDto: CreatePersonDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.create(createPersonDto, user);

  }

  @Get('/get-paginated')
  @Auth('PERSONS')
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPerson>> {

    return this.personsService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('PERSONS')
  async findOne(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('PERSONS')
  update(
    @Param('id') id: number, 
    @Body() updatePersonDto: UpdatePersonDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.update(id, updatePersonDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('PERSONS')
  remove(
    @Param('id') id: number
  ): Promise<ApiTransactionResponse<IPerson | string>> {

    return this.personsService.remove(id);

  }
}
