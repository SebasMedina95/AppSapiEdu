// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreatePosPreSapiDto } from './create-pos-pre-sapi.dto';

export class UpdatePosPreSapiDto extends PartialType(CreatePosPreSapiDto) {}
