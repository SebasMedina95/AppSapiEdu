// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateControlEntityDto } from './create-control-entity.dto';

export class UpdateControlEntityDto extends PartialType(CreateControlEntityDto) {}
