// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateCampusDto } from './create-campus.dto';

export class UpdateCampusDto extends PartialType(CreateCampusDto) {}
