import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { PermitAssignment } from './entities/permit-assignment.entity';
import { Person } from '../persons/entities/person.entity';

@Module({
  controllers: [
    UserController,
    AuthController
  ],
  providers: [
    UserService,
    AuthService
  ],
  imports: [

    ConfigModule,

    TypeOrmModule.forFeature([ 
      User,
      Role,
      PermitAssignment,
      Person 
    ]),

  ]
})
export class AuthModule {}
