import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from '../create/create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
