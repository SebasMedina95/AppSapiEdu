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
import { PageOptionsDto } from 'src/helpers/paginations/dto/page-options.dto';

import { IResponseTransactionBasic, IUser } from '../interfaces/user.interface';
import { ApiResponse } from 'src/utils/ApiResponse';
import { PageDto } from 'src/helpers/paginations/dto/page.dto';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ApiResponse<IResponseTransactionBasic | string>> {

    return this.userService.create(createUserDto);

  }

  @Get('/get-paginated')
  async findAll(
    @Body() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<IUser>> {

    return this.userService.findAll(pageOptionsDto);

  }

  @Get('/get-by-id/:id')
  async findOne(
    @Param('id') id: number
  ): Promise<ApiResponse<IUser | string>> {

    return this.userService.findOne(id);

  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ApiResponse<IUser | string>> {

    return this.userService.update(+id, updateUserDto);

  }

  @Delete('/remove-logic/:id')
  async remove(
    @Param('id') id: number
  ): Promise<ApiResponse<IUser | string>> {

    return this.userService.remove(id);

  }

  @Get('/validate-email/:id')
  async validateEmail(
    @Param('id') id: number
  ): Promise<ApiResponse<boolean | string>> {

    return this.userService.validateEmail(id);

  }

}
