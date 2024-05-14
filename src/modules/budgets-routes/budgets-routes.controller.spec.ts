import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsRoutesController } from './budgets-routes.controller';
import { BudgetsRoutesService } from './budgets-routes.service';

describe('BudgetsRoutesController', () => {
  let controller: BudgetsRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetsRoutesController],
      providers: [BudgetsRoutesService],
    }).compile();

    controller = module.get<BudgetsRoutesController>(BudgetsRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
