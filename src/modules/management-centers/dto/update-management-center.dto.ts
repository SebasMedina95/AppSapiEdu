import { PartialType } from '@nestjs/mapped-types';
import { CreateManagementCenterDto } from './create-management-center.dto';

export class UpdateManagementCenterDto extends PartialType(CreateManagementCenterDto) {}
