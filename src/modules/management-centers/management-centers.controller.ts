import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ManagementCentersService } from './management-centers.service';

import { CreateManagementCenterDto } from './dto/create-management-center.dto';
import { UpdateManagementCenterDto } from './dto/update-management-center.dto';

@ApiTags("Módulo de Centros Gestores")
@Controller('management-centers')
export class ManagementCentersController {
  constructor(private readonly managementCentersService: ManagementCentersService) {}

  @Post()
  create(@Body() createManagementCenterDto: CreateManagementCenterDto) {
    return this.managementCentersService.create(createManagementCenterDto);
  }

  @Get()
  findAll() {
    return this.managementCentersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managementCentersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagementCenterDto: UpdateManagementCenterDto) {
    return this.managementCentersService.update(+id, updateManagementCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managementCentersService.remove(+id);
  }
}
