import { PartialType } from '@nestjs/mapped-types';
import { CreateControlEntityDto } from './create-control-entity.dto';

export class UpdateControlEntityDto extends PartialType(CreateControlEntityDto) {}
