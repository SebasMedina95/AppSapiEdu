import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { AuthModule } from '../../../modules/auth/auth.module';
import { PersonsModule } from '../../../modules/persons/persons.module';
import { CampusModule } from '../../../modules/campus/campus.module';

import { User } from '../../../modules/auth/entities/user.entity';
import { Person } from '../../../modules/persons/entities/person.entity';
import { Role } from '../../../modules/auth/entities/role.entity';
import { PermitAssignment } from '../../../modules/auth/entities/permit-assignment.entity';
import { Campus } from '../../../modules/campus/entities/campus.entity';
import { ControlEntity } from '../../../modules/control-entities/entities/control-entity.entity';
import { PosPreOrigin } from '../../../modules/pos-pre-origin/entities/pos-pre-origin.entity';
import { PosPreSapi } from '../../../modules/pos-pre-sapi/entities/pos-pre-sapi.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([ 
        Campus, 
        PermitAssignment,
        Person,
        Role,
        User,
        ControlEntity,
        PosPreOrigin,
        PosPreSapi
      ]),

    AuthModule,
    CampusModule,
    PersonsModule,
  ]
})
export class SeedModule {}