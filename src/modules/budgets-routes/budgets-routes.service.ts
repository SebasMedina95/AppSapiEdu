import { Injectable } from '@nestjs/common';
import { CreateBudgetsRouteDto } from './dto/create-budgets-route.dto';
import { UpdateBudgetsRouteDto } from './dto/update-budgets-route.dto';

@Injectable()
export class BudgetsRoutesService {
  create(createBudgetsRouteDto: CreateBudgetsRouteDto) {
    return 'This action adds a new budgetsRoute';
  }

  findAll() {
    return `This action returns all budgetsRoutes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budgetsRoute`;
  }

  update(id: number, updateBudgetsRouteDto: UpdateBudgetsRouteDto) {
    return `This action updates a #${id} budgetsRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} budgetsRoute`;
  }
}
