import { Module } from '@nestjs/common';
import { BudgetsRoutesService } from './budgets-routes.service';
import { BudgetsRoutesController } from './budgets-routes.controller';

@Module({
  controllers: [BudgetsRoutesController],
  providers: [BudgetsRoutesService],
})
export class BudgetsRoutesModule {}
