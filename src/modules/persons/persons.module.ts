import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [
    TypeOrmModule.forFeature([ 
      Person 
    ]),
    AuthModule
  ]
})
export class PersonsModule {}
