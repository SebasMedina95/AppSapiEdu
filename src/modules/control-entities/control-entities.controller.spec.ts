import { Test, TestingModule } from '@nestjs/testing';
import { ControlEntitiesController } from './control-entities.controller';
import { ControlEntitiesService } from './control-entities.service';

describe('ControlEntitiesController', () => {
  let controller: ControlEntitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlEntitiesController],
      providers: [ControlEntitiesService],
    }).compile();

    controller = module.get<ControlEntitiesController>(ControlEntitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
