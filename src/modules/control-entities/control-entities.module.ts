import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ControlEntitiesService } from './control-entities.service';
import { ControlEntitiesController } from './control-entities.controller';
import { ControlEntity } from './entities/control-entity.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ControlEntitiesController],
  providers: [ControlEntitiesService],
  imports: [
    TypeOrmModule.forFeature([ 
      ControlEntity
    ]),
    AuthModule
  ]
})
export class ControlEntitiesModule {}
