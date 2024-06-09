import { IsBoolean,
         IsDate,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagementCenterDto {

    @ApiProperty({
        example: "SIPI - Gestor de Fondos",
        description: "Nombre completo del centro gestor",
        uniqueItems: true,
    })
    @IsString({ message: "El nombre debe ser un String válido" })
    @MinLength(4, { message: "El nombre debe tener al menos 4 caracteres" })
    @MaxLength(250, { message: "El nombre no puede exceder los 250 caracteres" })
    name: string;

    @ApiProperty({
        example: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.",
        description: "Descripción del centro gestor",
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
    @IsOptional()
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
