import { Test, TestingModule } from '@nestjs/testing';
import { ManagementCentersService } from './management-centers.service';

describe('ManagementCentersService', () => {
  let service: ManagementCentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagementCentersService],
    }).compile();

    service = module.get<ManagementCentersService>(ManagementCentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
