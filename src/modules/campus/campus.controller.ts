import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { ApiResponse } from 'src/utils/ApiResponse';
import { ICampus } from './interfaces/campus.interfaces';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Post('/create')
  async create(@Body() createCampusDto: CreateCampusDto): Promise<ApiResponse<ICampus | string>> {
    return this.campusService.create(createCampusDto);
  }

  @Get()
  findAll() {
    return this.campusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampusDto: UpdateCampusDto) {
    return this.campusService.update(+id, updateCampusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campusService.remove(+id);
  }
}
