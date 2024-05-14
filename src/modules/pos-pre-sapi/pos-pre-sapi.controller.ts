import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PosPreSapiService } from './pos-pre-sapi.service';
import { CreatePosPreSapiDto } from './dto/create-pos-pre-sapi.dto';
import { UpdatePosPreSapiDto } from './dto/update-pos-pre-sapi.dto';

@Controller('pos-pre-sapi')
export class PosPreSapiController {
  constructor(private readonly posPreSapiService: PosPreSapiService) {}

  @Post()
  create(@Body() createPosPreSapiDto: CreatePosPreSapiDto) {
    return this.posPreSapiService.create(createPosPreSapiDto);
  }

  @Get()
  findAll() {
    return this.posPreSapiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posPreSapiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePosPreSapiDto: UpdatePosPreSapiDto) {
    return this.posPreSapiService.update(+id, updatePosPreSapiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posPreSapiService.remove(+id);
  }
}
