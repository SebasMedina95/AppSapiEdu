import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create/create-user.dto';
import { UpdateUserDto } from '../dto/update/update-user.dto';

import { IResponseTransactionBasic, IUser } from '../interfaces/user.interface';
import { ApiResponse } from 'src/utils/ApiResponse';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ApiResponse<IResponseTransactionBasic | string>> {

    return this.userService.create(createUserDto);

  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
