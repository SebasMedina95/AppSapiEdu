import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsRoutesService } from './budgets-routes.service';

describe('BudgetsRoutesService', () => {
  let service: BudgetsRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetsRoutesService],
    }).compile();

    service = module.get<BudgetsRoutesService>(BudgetsRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
