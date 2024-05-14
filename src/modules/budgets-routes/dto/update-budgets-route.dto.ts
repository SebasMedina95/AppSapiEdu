import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetsRouteDto } from './create-budgets-route.dto';

export class UpdateBudgetsRouteDto extends PartialType(CreateBudgetsRouteDto) {}
