import { Injectable } from '@nestjs/common';
import { CreatePosPreOriginDto } from './dto/create-pos-pre-origin.dto';
import { UpdatePosPreOriginDto } from './dto/update-pos-pre-origin.dto';

@Injectable()
export class PosPreOriginService {
  create(createPosPreOriginDto: CreatePosPreOriginDto) {
    return 'This action adds a new posPreOrigin';
  }

  findAll() {
    return `This action returns all posPreOrigin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} posPreOrigin`;
  }

  update(id: number, updatePosPreOriginDto: UpdatePosPreOriginDto) {
    return `This action updates a #${id} posPreOrigin`;
  }

  remove(id: number) {
    return `This action removes a #${id} posPreOrigin`;
  }
}
