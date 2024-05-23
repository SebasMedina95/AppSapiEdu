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
import { IPerson } from '../persons/interfaces/person.interfaces';
import { Auth } from '../auth/decorators/auth-protected.decorator';
import { MyGetUserDecorator } from '../auth/decorators/get-user.decorator';
import { IUser } from '../auth/interfaces/user.interface';

@Controller('campus')
export class CampusController {

  constructor(private readonly campusService: CampusService) {}

  @Post('/create')
  @Auth('CAMPUS')
  async create(
    @Body() createCampusDto: CreateCampusDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiResponse<ICampus | string>> {

    return this.campusService.create(createCampusDto, user);

  }

  @Get('/get-paginated')
  @Auth('CAMPUS')
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<ICampus> | Object> {

    return this.campusService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  @Auth('CAMPUS')
  findOne(
    @Param('id') id: number
  ): Promise<ApiResponse<ICampus | string>> {

    return this.campusService.findOne(id);

  }

  @Patch('/update/:id')
  @Auth('CAMPUS')
  update(
    @Param('id') id: number, 
    @Body() updateCampusDto: UpdateCampusDto,
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiResponse<ICampus | string>> {

    return this.campusService.update(id, updateCampusDto, user);

  }

  @Delete('/remove-logic/:id')
  @Auth('CAMPUS')
  remove(@Param('id') id: number): Promise<ApiResponse<ICampus | string>> {
    return this.campusService.remove(id);
  }

  @Get('/get-persons-by-campus/:id')
  @Auth('CAMPUS')
  findPersonsByCampus(
    @Param('id') id: number,
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IPerson> | Object> {

    return this.campusService.findPersonsByCampus(id, pageOptionsDto);

  }

}
