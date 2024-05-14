import { Injectable } from '@nestjs/common';
import { CreateFunctionalAreaDto } from './dto/create-functional-area.dto';
import { UpdateFunctionalAreaDto } from './dto/update-functional-area.dto';

@Injectable()
export class FunctionalAreasService {
  create(createFunctionalAreaDto: CreateFunctionalAreaDto) {
    return 'This action adds a new functionalArea';
  }

  findAll() {
    return `This action returns all functionalAreas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} functionalArea`;
  }

  update(id: number, updateFunctionalAreaDto: UpdateFunctionalAreaDto) {
    return `This action updates a #${id} functionalArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} functionalArea`;
  }
}
