import { Test, TestingModule } from '@nestjs/testing';
import { ControlEntitiesService } from './control-entities.service';

describe('ControlEntitiesService', () => {
  let service: ControlEntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlEntitiesService],
    }).compile();

    service = module.get<ControlEntitiesService>(ControlEntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
