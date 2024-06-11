// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateManagementCenterDto } from './create-management-center.dto';

export class UpdateManagementCenterDto extends PartialType(CreateManagementCenterDto) {}
