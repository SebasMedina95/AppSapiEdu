import { PartialType } from '@nestjs/mapped-types';
import { CreatePosPreSapiDto } from './create-pos-pre-sapi.dto';

export class UpdatePosPreSapiDto extends PartialType(CreatePosPreSapiDto) {}
