import { Test, TestingModule } from '@nestjs/testing';
import { PosPreOriginService } from './pos-pre-origin.service';

describe('PosPreOriginService', () => {
  let service: PosPreOriginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PosPreOriginService],
    }).compile();

    service = module.get<PosPreOriginService>(PosPreOriginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
