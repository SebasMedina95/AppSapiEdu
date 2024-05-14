import { Injectable } from '@nestjs/common';
import { CreateManagementCenterDto } from './dto/create-management-center.dto';
import { UpdateManagementCenterDto } from './dto/update-management-center.dto';

@Injectable()
export class ManagementCentersService {
  create(createManagementCenterDto: CreateManagementCenterDto) {
    return 'This action adds a new managementCenter';
  }

  findAll() {
    return `This action returns all managementCenters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managementCenter`;
  }

  update(id: number, updateManagementCenterDto: UpdateManagementCenterDto) {
    return `This action updates a #${id} managementCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} managementCenter`;
  }
}
