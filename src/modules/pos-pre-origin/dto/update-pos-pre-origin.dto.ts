// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreatePosPreOriginDto } from './create-pos-pre-origin.dto';

export class UpdatePosPreOriginDto extends PartialType(CreatePosPreOriginDto) {}
