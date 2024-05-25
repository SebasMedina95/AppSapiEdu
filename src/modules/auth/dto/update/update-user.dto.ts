// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../create/create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        example: "Sebas123",
        description: "Usuario/Nickname de usuario para login",
        uniqueItems: true,
    })
    @IsString()
    user: string;

    @ApiProperty({
        example: "Sebas123",
        description: "Contraseña de usuario para login",
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: "S",
        description: "¿Realizaremos cambios en el avatar (S o N)?",
        default: "N"
    })
    @IsString()
    @IsOptional()
    changeImageUser?: string;

}
