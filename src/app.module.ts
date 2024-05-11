import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/database/data-source';


@Module({
  imports: [

    //? Configuración Global
    ConfigModule.forRoot({ isGlobal: true }),

    //? Configuración del TypeORM y PostgreSQL
    TypeOrmModule.forRoot(dataSourceOptions),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
