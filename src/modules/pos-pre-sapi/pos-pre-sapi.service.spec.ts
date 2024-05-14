import { Test, TestingModule } from '@nestjs/testing';
import { PosPreSapiService } from './pos-pre-sapi.service';

describe('PosPreSapiService', () => {
  let service: PosPreSapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PosPreSapiService],
    }).compile();

    service = module.get<PosPreSapiService>(PosPreSapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
