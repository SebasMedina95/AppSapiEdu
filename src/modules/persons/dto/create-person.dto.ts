import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate,
         IsEmail,
         IsIn,
         IsNumber,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";
import { ICampus } from "src/modules/campus/interfaces/campus.interfaces";

export class CreatePersonDto {

    @ApiProperty({
        example: "CC",
        description: "Tipo de documento de la persona",
    })
    @IsIn(['TI', 'CC', 'LM', 'NIT', 'CE'], { message: "El tipo de documento debe ser válido" })
    documentType: string;

    @ApiProperty({
        example: "123456789",
        description: "Número de documento de la persona",
        uniqueItems: true,
    })
    @IsString({ message: "El número de documento debe ser válido" })
    @MinLength(5, { message: "El número de documento debe tener al menos 5 caracteres" })
    @MaxLength(50, { message: "El número de documento no puede exceder los 50 caracteres" })
    document: string;

    @ApiProperty({
        example: "Juan Sebastian",
        description: "Nombres de la persona",
    })
    @IsString({ message: "Los nombres deben ser válidos" })
    @MinLength(3, { message: "Los nombres deben tener al menos 3 caracteres" })
    @MaxLength(100, { message: "Los nombres no puede exceder los 100 caracteres" })
    names: string;

    @ApiProperty({
        example: "Medina Toro",
        description: "Apellidos de la persona",
    })
    @IsString({ message: "Los apellidos deben ser válidos" })
    @MinLength(3, { message: "Los apellidos deben tener al menos 5 caracteres" })
    @MaxLength(100, { message: "Los apellidos no puede exceder los 100 caracteres" })
    lastNames: string;

    @ApiProperty({
        example: "M",
        description: "Género de la persona",
    })
    @IsIn(['M', 'F', 'NA'], { message: "El género debe ser válido" })
    gender: string;

    @ApiProperty({
        example: "Carrera 46a # 121 - 43",
        description: "Dirección residencial de la persona",
        required: false
    })
    @IsString({ message: "La dirección debe ser válido" })
    @MinLength(1, { message: "La dirección debe tener al menos 1 caractere" })
    @MaxLength(150, { message: "La dirección no puede exceder los 150 caracteres" })
    @IsOptional()
    address: string;

    @ApiProperty({
        example: "3127819911",
        description: "Número telefónico de la persona",
        required: false
    })
    @IsString({ message: "El teléfono debe ser válido" })
    @MinLength(1, { message: "El teléfono debe tener al menos 1 caractere" })
    @MaxLength(60, { message: "El teléfono no puede exceder los 60 caracteres" })
    @IsOptional()
    phone: string;

    @ApiProperty({
        example: "jsebastianmedina@correo.com",
        description: "Correo electrónico del usuario",
        uniqueItems: true,
    })
    @IsEmail({}, { message: "El email debe ser un email válido" })
    @MaxLength(150, { message: "El email no puede exceder los 150 caracteres" })
    email: string;

    @ApiProperty({
        example: "1995-05-02",
        description: "Fecha de cumpleaños de la persona",
        required: false
    })
    @IsDate({ message: "La fecha de nacimiento debe ser válida" })
    @IsOptional()
    birthDate: Date;

    @ApiProperty({
        example: "O+",
        description: "Tipo de sangre de la persona",
        required: false
    })
    @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { message: "El tipo de sangre debe ser válido" })
    @IsOptional()
    bloodType: string;

    @ApiProperty({
        example: "A1",
        description: "Tipo de persona de la persona",
    })
    @IsIn(['A1', 'A2', 'A3'], { message: "El tipo de persona debe ser válido" })
    type: string;

    @ApiProperty({
        example: true,
        description: "Estado de eliminación de la persona",
        default: true
    })
    @IsBoolean()
    @IsOptional()
    status: boolean;

    // REQUERIDO PARA LAS RELACIONES
    @IsNumber({}, { message: "El campus de registro de la persona es requerido" })
    campus: ICampus | number;

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

}

