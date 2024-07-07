import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PosPreSapi } from './entities/pos-pre-sapi.entity';
import { PosPreSapiService } from './pos-pre-sapi.service';
import { PosPreSapiController } from './pos-pre-sapi.controller';

import { Person } from '../persons/entities/person.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PosPreSapiController],
  providers: [PosPreSapiService],
  imports: [
    TypeOrmModule.forFeature([ 
      PosPreSapi,
      Person
    ]),
    AuthModule
  ]
})
export class PosPreSapiModule {}
