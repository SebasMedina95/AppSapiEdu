import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PosPreOriginService } from './pos-pre-origin.service';
import { CreatePosPreOriginDto } from './dto/create-pos-pre-origin.dto';
import { UpdatePosPreOriginDto } from './dto/update-pos-pre-origin.dto';

@Controller('pos-pre-origin')
export class PosPreOriginController {
  constructor(private readonly posPreOriginService: PosPreOriginService) {}

  @Post()
  create(@Body() createPosPreOriginDto: CreatePosPreOriginDto) {
    return this.posPreOriginService.create(createPosPreOriginDto);
  }

  @Get()
  findAll() {
    return this.posPreOriginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posPreOriginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePosPreOriginDto: UpdatePosPreOriginDto) {
    return this.posPreOriginService.update(+id, updatePosPreOriginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posPreOriginService.remove(+id);
  }
}
