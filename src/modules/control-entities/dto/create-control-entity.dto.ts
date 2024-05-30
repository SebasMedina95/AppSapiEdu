import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateControlEntityDto {
    
    @ApiProperty({
        example: "Entidad de Apoyo a Pregrados",
        description: "Nombre de la Entidad de Control",
        uniqueItems: true,
    })
    @IsString({ message: "El nombre de la entidad de control debe ser un String válido" })
    @MinLength(3, { message: "El nombre de la entidad de control debe tener al menos 3 caracteres" })
    @MaxLength(200, { message: "El nombre de la entidad de control no puede exceder los 200 caracteres" })
    name: string;

    @ApiProperty({
        example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue eros, pharetra eget risus eu, tristique vulputate magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam tincidunt nisi vel quam convallis venenatis.",
        description: "Descripción de la Entidad de Control"
    })
    @IsString({ message: "La descripción de la entidad de control debe ser un String válido" })
    @MinLength(3, { message: "La descripción de la entidad de control debe tener al menos 3 caracteres" })
    @MaxLength(5000, { message: "La descripción de la entidad de control no puede exceder los 5000 caracteres" })
    description: string;

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
