import { Injectable } from '@nestjs/common';
import { CreatePosPreSapiDto } from './dto/create-pos-pre-sapi.dto';
import { UpdatePosPreSapiDto } from './dto/update-pos-pre-sapi.dto';

@Injectable()
export class PosPreSapiService {
  create(createPosPreSapiDto: CreatePosPreSapiDto) {
    return 'This action adds a new posPreSapi';
  }

  findAll() {
    return `This action returns all posPreSapi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} posPreSapi`;
  }

  update(id: number, updatePosPreSapiDto: UpdatePosPreSapiDto) {
    return `This action updates a #${id} posPreSapi`;
  }

  remove(id: number) {
    return `This action removes a #${id} posPreSapi`;
  }
}
