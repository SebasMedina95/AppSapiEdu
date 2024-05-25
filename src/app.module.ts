import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from './config/database/data-source';

import { FilesModule } from './helpers/files/files.module';

import { AuthModule } from './modules/auth/auth.module';
import { BudgetsRoutesModule } from './modules/budgets-routes/budgets-routes.module';
import { CampusModule } from './modules/campus/campus.module';
import { ControlEntitiesModule } from './modules/control-entities/control-entities.module';
import { FunctionalAreasModule } from './modules/functional-areas/functional-areas.module';
import { FundsModule } from './modules/funds/funds.module';
import { ManagementCentersModule } from './modules/management-centers/management-centers.module';
import { PersonsModule } from './modules/persons/persons.module';
import { PosPreOriginModule } from './modules/pos-pre-origin/pos-pre-origin.module';
import { PosPreSapiModule } from './modules/pos-pre-sapi/pos-pre-sapi.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RoleModule } from './helpers/roles/valid-roles.module';
import { join } from 'path';


@Module({
  imports: [

    //? Configuración Global
    ConfigModule.forRoot({ isGlobal: true }),

    //? Servidor Estático
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //? Configuración del TypeORM y PostgreSQL
    TypeOrmModule.forRoot(dataSourceOptions),

    //? Módulos de trabajo
    AuthModule,
    BudgetsRoutesModule,
    CampusModule,
    ControlEntitiesModule,
    FunctionalAreasModule,
    FundsModule,
    ManagementCentersModule,
    PersonsModule,
    PosPreOriginModule,
    PosPreSapiModule,
    ProjectsModule,

    //? Módulos tipo Helper
    FilesModule,
    RoleModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
