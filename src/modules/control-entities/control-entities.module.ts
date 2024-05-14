import { Module } from '@nestjs/common';
import { ControlEntitiesService } from './control-entities.service';
import { ControlEntitiesController } from './control-entities.controller';

@Module({
  controllers: [ControlEntitiesController],
  providers: [ControlEntitiesService],
})
export class ControlEntitiesModule {}
