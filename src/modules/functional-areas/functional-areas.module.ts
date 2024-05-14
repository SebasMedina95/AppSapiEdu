import { Module } from '@nestjs/common';
import { FunctionalAreasService } from './functional-areas.service';
import { FunctionalAreasController } from './functional-areas.controller';

@Module({
  controllers: [FunctionalAreasController],
  providers: [FunctionalAreasService],
})
export class FunctionalAreasModule {}
