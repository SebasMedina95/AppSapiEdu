import { Module } from '@nestjs/common';
import { PosPreOriginService } from './pos-pre-origin.service';
import { PosPreOriginController } from './pos-pre-origin.controller';

@Module({
  controllers: [PosPreOriginController],
  providers: [PosPreOriginService],
})
export class PosPreOriginModule {}
