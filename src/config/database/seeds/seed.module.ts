import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { AuthModule } from 'src/modules/auth/auth.module';
import { PersonsModule } from 'src/modules/persons/persons.module';
import { CampusModule } from 'src/modules/campus/campus.module';

import { User } from 'src/modules/auth/entities/user.entity';
import { Person } from 'src/modules/persons/entities/person.entity';
import { Role } from 'src/modules/auth/entities/role.entity';
import { PermitAssignment } from 'src/modules/auth/entities/permit-assignment.entity';
import { Campus } from 'src/modules/campus/entities/campus.entity';

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
      ]),

    AuthModule,
    CampusModule,
    PersonsModule,
  ]
})
export class SeedModule {}