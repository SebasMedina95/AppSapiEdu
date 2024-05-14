import { Injectable } from '@nestjs/common';
import { CreateControlEntityDto } from './dto/create-control-entity.dto';
import { UpdateControlEntityDto } from './dto/update-control-entity.dto';

@Injectable()
export class ControlEntitiesService {
  create(createControlEntityDto: CreateControlEntityDto) {
    return 'This action adds a new controlEntity';
  }

  findAll() {
    return `This action returns all controlEntities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} controlEntity`;
  }

  update(id: number, updateControlEntityDto: UpdateControlEntityDto) {
    return `This action updates a #${id} controlEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} controlEntity`;
  }
}
