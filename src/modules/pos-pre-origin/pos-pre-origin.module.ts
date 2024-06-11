import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PosPreOrigin } from './entities/pos-pre-origin.entity';
import { PosPreOriginService } from './pos-pre-origin.service';
import { PosPreOriginController } from './pos-pre-origin.controller';

import { Person } from '../persons/entities/person.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PosPreOriginController],
  providers: [PosPreOriginService],
  imports: [
    TypeOrmModule.forFeature([ 
      PosPreOrigin,
      Person
    ]),
    AuthModule
  ]
})
export class PosPreOriginModule {}
