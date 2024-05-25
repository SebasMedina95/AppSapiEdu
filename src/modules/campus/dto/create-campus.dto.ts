import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";

export class CreateCampusDto {

    @ApiProperty({
        example: "Sede Valle - Edificio Montana Norte",
        description: "Nombre completo del campus",
        uniqueItems: true,
    })
    @IsString({ message: "El nombre debe ser un String válido" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @MaxLength(200, { message: "El nombre no puede exceder los 200 caracteres" })
    name: string;

    @ApiProperty({
        example: "Calle 17A # 45 - 123 Edificio X",
        description: "Dirección del campus",
    })
    @IsString({ message: "La dirección debe ser un String válido" })
    @MinLength(3, { message: "La dirección debe tener al menos 3 caracteres" })
    @MaxLength(150, { message: "La dirección no puede exceder los 150 caracteres" })
    address: string;

    @ApiProperty({
        example: "6042329812",
        description: "Número de teléfono 1 del campus",
    })
    @IsString({ message: "El teléfono 1 debe ser un String válido" })
    @MinLength(3, { message: "El teléfono 1 debe tener al menos 3 caracteres" })
    @MaxLength(100, { message: "El teléfono 1 no puede exceder los 100 caracteres" })
    phone1: string;

    @ApiProperty({
        example: "6042329111",
        description: "Número de teléfono 2 del campus",
        required: false,
    })
    @IsString({ message: "El teléfono 2 debe ser un String válido" })
    @MaxLength(100, { message: "El teléfono 2 no puede exceder los 100 caracteres" })
    @IsOptional()
    phone2: string;

    @ApiProperty({
        example: "correo-sede1@correo.com",
        description: "Correo Electrónico # 1 de la Sede",
    })
    @IsString({ message: "El email 1 debe ser un String válido" })
    @MinLength(3, { message: "El email 1 debe tener al menos 3 caracteres" })
    @MaxLength(150, { message: "El email 1 no puede exceder los 150 caracteres" })
    @IsEmail({}, { message: "El email 1 debe ser un email válido" })
    email1: string;

    @ApiProperty({
        example: "correo-sede2@correo.com",
        description: "Correo Electrónico # 2 de la Sede",
        required: false,
    })
    @IsString({ message: "El email 2 debe ser un String válido" })
    @MaxLength(150, { message: "El email 2 no puede exceder los 150 caracteres" })
    @IsEmail({}, { message: "El email 2 debe tener un formato válido" })
    @IsOptional()
    email2: string;

    @ApiProperty({
        example: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.",
        description: "Descripción de la Sede",
        required: false,
    })
    @IsString({ message: "La descripción debe ser un String válido" })
    @MaxLength(500, { message: "La descripción no puede exceder los 500 caracteres" })
    @IsOptional()
    description: string;

    @ApiProperty({
        example: "true",
        description: "Estado de eliminación lógico",
        default: true,
        required: false,
    })
    @IsBoolean()
    status: boolean;

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
