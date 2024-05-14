import { Test, TestingModule } from '@nestjs/testing';
import { PosPreOriginController } from './pos-pre-origin.controller';
import { PosPreOriginService } from './pos-pre-origin.service';

describe('PosPreOriginController', () => {
  let controller: PosPreOriginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosPreOriginController],
      providers: [PosPreOriginService],
    }).compile();

    controller = module.get<PosPreOriginController>(PosPreOriginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
