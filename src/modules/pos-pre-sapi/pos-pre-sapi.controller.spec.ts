import { Test, TestingModule } from '@nestjs/testing';
import { PosPreSapiController } from './pos-pre-sapi.controller';
import { PosPreSapiService } from './pos-pre-sapi.service';

describe('PosPreSapiController', () => {
  let controller: PosPreSapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosPreSapiController],
      providers: [PosPreSapiService],
    }).compile();

    controller = module.get<PosPreSapiController>(PosPreSapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
