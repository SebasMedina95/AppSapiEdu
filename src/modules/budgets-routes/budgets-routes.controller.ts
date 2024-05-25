import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BudgetsRoutesService } from './budgets-routes.service';

import { CreateBudgetsRouteDto } from './dto/create-budgets-route.dto';
import { UpdateBudgetsRouteDto } from './dto/update-budgets-route.dto';

@ApiTags("Módulo de Rutas Presupuestales")
@Controller('budgets-routes')
export class BudgetsRoutesController {
  constructor(private readonly budgetsRoutesService: BudgetsRoutesService) {}

  @Post()
  create(@Body() createBudgetsRouteDto: CreateBudgetsRouteDto) {
    return this.budgetsRoutesService.create(createBudgetsRouteDto);
  }

  @Get()
  findAll() {
    return this.budgetsRoutesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetsRoutesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetsRouteDto: UpdateBudgetsRouteDto) {
    return this.budgetsRoutesService.update(+id, updateBudgetsRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsRoutesService.remove(+id);
  }
}
