import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { PersonsService } from './persons.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { ApiResponse } from 'src/utils/ApiResponse';

import { IPerson } from './interfaces/person.interfaces';

@Controller('persons')
export class PersonsController {

  constructor(private readonly personsService: PersonsService) {}

  @Post('/create')
  create(
    @Body() createPersonDto: CreatePersonDto
  ): Promise<ApiResponse<IPerson | string>> {

    return this.personsService.create(createPersonDto);

  }

  @Get('/get-paginated')
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPerson>> {

    return this.personsService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  async findOne(
    @Param('id') id: number
  ): Promise<ApiResponse<IPerson | string>> {

    return this.personsService.findOne(id);

  }

  @Patch('/update/:id')
  update(
    @Param('id') id: number, 
    @Body() updatePersonDto: UpdatePersonDto
  ): Promise<ApiResponse<IPerson | string>> {

    return this.personsService.update(id, updatePersonDto);

  }

  @Delete('/remove-logic/:id')
  remove(
    @Param('id') id: number
  ): Promise<ApiResponse<IPerson | string>> {

    return this.personsService.remove(id);

  }
}
