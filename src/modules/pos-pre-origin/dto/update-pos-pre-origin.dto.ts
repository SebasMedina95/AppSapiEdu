import { PartialType } from '@nestjs/mapped-types';
import { CreatePosPreOriginDto } from './create-pos-pre-origin.dto';

export class UpdatePosPreOriginDto extends PartialType(CreatePosPreOriginDto) {}
