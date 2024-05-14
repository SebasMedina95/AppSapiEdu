import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ControlEntitiesService } from './control-entities.service';
import { CreateControlEntityDto } from './dto/create-control-entity.dto';
import { UpdateControlEntityDto } from './dto/update-control-entity.dto';

@Controller('control-entities')
export class ControlEntitiesController {
  constructor(private readonly controlEntitiesService: ControlEntitiesService) {}

  @Post()
  create(@Body() createControlEntityDto: CreateControlEntityDto) {
    return this.controlEntitiesService.create(createControlEntityDto);
  }

  @Get()
  findAll() {
    return this.controlEntitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controlEntitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateControlEntityDto: UpdateControlEntityDto) {
    return this.controlEntitiesService.update(+id, updateControlEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controlEntitiesService.remove(+id);
  }
}
