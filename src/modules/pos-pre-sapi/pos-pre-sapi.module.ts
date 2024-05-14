import { Module } from '@nestjs/common';
import { PosPreSapiService } from './pos-pre-sapi.service';
import { PosPreSapiController } from './pos-pre-sapi.controller';

@Module({
  controllers: [PosPreSapiController],
  providers: [PosPreSapiService],
})
export class PosPreSapiModule {}
