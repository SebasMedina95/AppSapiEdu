import { Test, TestingModule } from '@nestjs/testing';
import { ManagementCentersController } from './management-centers.controller';
import { ManagementCentersService } from './management-centers.service';

describe('ManagementCentersController', () => {
  let controller: ManagementCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagementCentersController],
      providers: [ManagementCentersService],
    }).compile();

    controller = module.get<ManagementCentersController>(ManagementCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
