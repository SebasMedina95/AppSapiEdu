import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
         
import { CampusService } from './campus.service';
import { ApiResponse } from 'src/utils/ApiResponse';
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

import { ICampus } from './interfaces/campus.interfaces';

@Controller('campus')
export class CampusController {

  constructor(private readonly campusService: CampusService) {}

  @Post('/create')
  async create(
    @Body() createCampusDto: CreateCampusDto
  ): Promise<ApiResponse<ICampus | string>> {

    return this.campusService.create(createCampusDto);

  }

  @Get('/get-paginated')
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<ICampus> | Object> {

    return this.campusService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  findOne(
    @Param('id') id: number
  ): Promise<ApiResponse<ICampus | string>> {

    return this.campusService.findOne(id);

  }

  @Patch('/update/:id')
  update(
    @Param('id') id: number, 
    @Body() updateCampusDto: UpdateCampusDto
  ): Promise<ApiResponse<ICampus | string>> {

    return this.campusService.update(id, updateCampusDto);

  }

  @Delete('/remove-logic/:id')
  remove(@Param('id') id: number): Promise<ApiResponse<ICampus | string>> {
    return this.campusService.remove(id);
  }
}
