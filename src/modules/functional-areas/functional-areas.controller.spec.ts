import { Test, TestingModule } from '@nestjs/testing';
import { FunctionalAreasController } from './functional-areas.controller';
import { FunctionalAreasService } from './functional-areas.service';

describe('FunctionalAreasController', () => {
  let controller: FunctionalAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunctionalAreasController],
      providers: [FunctionalAreasService],
    }).compile();

    controller = module.get<FunctionalAreasController>(FunctionalAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
