import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../create/create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    user: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    changeImageUser?: string;

}
