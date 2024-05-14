import { Module } from '@nestjs/common';
import { ManagementCentersService } from './management-centers.service';
import { ManagementCentersController } from './management-centers.controller';

@Module({
  controllers: [ManagementCentersController],
  providers: [ManagementCentersService],
})
export class ManagementCentersModule {}
