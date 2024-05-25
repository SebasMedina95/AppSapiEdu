import { IsBoolean,
         IsDate,
         IsNotEmpty,
         IsOptional,
         IsString,
         Matches,
         MaxLength,
         MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Person } from "src/modules/persons/entities/person.entity";
import { PermitAssignment } from "../../entities/permit-assignment.entity";

export class CreateUserDto {

    @ApiProperty({
        example: "Sebas123",
        description: "Usuario/Nickname de usuario para login",
        uniqueItems: true,
    })
    @IsString({ message: "El nombre de usuario debe ser válido" })
    @MinLength(5, { message: "El nombre de usuario debe tener al menos 5 caracteres" })
    @MaxLength(50, { message: "El nombre de usuario no puede exceder los 50 caracteres" })
    user: string;

    @ApiProperty({
        example: "Sebas123",
        description: "Contraseña de usuario para login",
    })
    @IsString({ message: "La contraseña debe ser válido" })
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    @MaxLength(100, { message: "La contraseña no puede exceder los 100 caracteres" })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @ApiProperty({
        example: true,
        description: "Estado de eliminación del usuario",
        default: true
    })
    @IsBoolean()
    @IsOptional()
    status: boolean;

    @ApiProperty({
        example: false,
        description: "¿El usuario ha validado su email?",
        default: true
    })
    @IsBoolean()
    @IsOptional()
    isValid: boolean;

    @ApiProperty({
        example: "http://res.cloudinary.com/dervi5j2i/image/upload/v1716273774/hysit6g5e0h4ccmmcxim.jpg",
        description: "Avatar de usuario",
        default: "default.png",
        required: false,
    })
    @IsString()
    @IsOptional()
    avatar: string;

    @ApiProperty({
        example: "123456789",
        description: "Documento de la persona/usuario que creó",
        required: false,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    createDocumentUserAt: string;

    @ApiProperty({
        example: "2024-05-25",
        description: "Fecha de creación del registro",
        required: false,
    })
    @IsDate()
    @IsOptional()
    createDateAt: Date;

    @ApiProperty({
        example: "123456789",
        description: "Documento de la persona/usuario que actualizó",
        required: false,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    updateDocumentUserAt: string;

    @ApiProperty({
        example: "2024-05-25",
        description: "Fecha de actualización del registro",
        required: false,
    })
    @IsDate()
    @IsOptional()
    updateDateAt: Date;

    @ApiProperty({
        example: 3,
        description: "Id de la persona asociada al usuario",
    })
    @IsNotEmpty()
    person: Person | number;

    @ApiProperty({
        example: [1,2,3,4,5,6,7,8,9,10,11,12],
        description: "Ids de roles asociados al usuario",
    })
    @IsNotEmpty()
    permit: PermitAssignment[] | number[];

}
