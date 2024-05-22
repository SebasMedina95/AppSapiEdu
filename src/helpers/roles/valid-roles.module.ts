import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './valid-roles.service';
import { Role } from 'src/modules/auth/entities/role.entity';

@Module({
  controllers: [],
  providers: [
    RolesService,
  ],
  imports: [

    //Configuraciones generales de módulo
    ConfigModule,

    //Configuraciones TypeORM para las entidades usadas
    TypeOrmModule.forFeature([ 
      Role,
    ]),

  ],
  exports: [
    RolesService,
  ]
})
export class RoleModule {}
