import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagementCenter } from './entities/management-center.entity';
import { Person } from '../persons/entities/person.entity';

import { ManagementCentersService } from './management-centers.service';
import { ManagementCentersController } from './management-centers.controller';

import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ManagementCentersController],
  providers: [ManagementCentersService],
  imports: [
    TypeOrmModule.forFeature([ 
      ManagementCenter,
      Person
    ]),
    AuthModule
  ]
})
export class ManagementCentersModule {}
