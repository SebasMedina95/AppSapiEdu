import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { EmailService } from './services/email.service';
import { PersonsService } from '../persons/persons.service';
import { FilesService } from 'src/helpers/files/files.service';
import { JwtStrategy } from './strategies/jwt.strategy';

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
    EmailService,
    AuthService,
    PersonsService,
    FilesService,
    JwtStrategy
  ],
  imports: [

    //Configuraciones generales de módulo
    ConfigModule,

    //Configuraciones TypeORM para las entidades usadas
    TypeOrmModule.forFeature([ 
      User,
      Role,
      PermitAssignment,
      Person 
    ]),
    AuthModule,

    //Configuraciones para el Auth
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: () => {

        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '4h'
          }
        }
        
      }
    })

  ],
  exports: [
    AuthService,
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
