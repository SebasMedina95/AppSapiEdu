import { Test, TestingModule } from '@nestjs/testing';
import { FunctionalAreasService } from './functional-areas.service';

describe('FunctionalAreasService', () => {
  let service: FunctionalAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunctionalAreasService],
    }).compile();

    service = module.get<FunctionalAreasService>(FunctionalAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
