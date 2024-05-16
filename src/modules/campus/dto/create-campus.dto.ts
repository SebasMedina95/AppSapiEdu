import { IsBoolean, IsDate, IsEmail,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";


export class CreateCampusDto {

    @IsString({ message: "El nombre debe ser un String válido" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @MaxLength(200, { message: "El nombre no puede exceder los 200 caracteres" })
    name: string;

    @IsString({ message: "La dirección debe ser un String válido" })
    @MinLength(3, { message: "La dirección debe tener al menos 3 caracteres" })
    @MaxLength(150, { message: "La dirección no puede exceder los 150 caracteres" })
    address: string;

    @IsString({ message: "El teléfono 1 debe ser un String válido" })
    @MinLength(3, { message: "El teléfono 1 debe tener al menos 3 caracteres" })
    @MaxLength(100, { message: "El teléfono 1 no puede exceder los 100 caracteres" })
    phone1: string;

    @IsString({ message: "El teléfono 2 debe ser un String válido" })
    @MaxLength(100, { message: "El teléfono 2 no puede exceder los 100 caracteres" })
    @IsOptional()
    phone2: string;

    @IsString({ message: "El email 1 debe ser un String válido" })
    @MinLength(3, { message: "El email 1 debe tener al menos 3 caracteres" })
    @MaxLength(150, { message: "El email 1 no puede exceder los 150 caracteres" })
    @IsEmail({}, { message: "El email 1 debe ser un email válido" })
    email1: string;

    @IsString({ message: "El email 2 debe ser un String válido" })
    @MaxLength(150, { message: "El email 2 no puede exceder los 150 caracteres" })
    @IsEmail({}, { message: "El email 2 debe tener un formato válido" })
    @IsOptional()
    email2: string;

    @IsString({ message: "La descripción debe ser un String válido" })
    @MaxLength(500, { message: "La descripción no puede exceder los 500 caracteres" })
    @IsOptional()
    description: string;

    @IsBoolean()
    status: boolean;

    @IsString()
    @MinLength(1)
    @IsOptional()
    createDocumentUserAt: string;

    @IsDate()
    @IsOptional()
    createDateAt: Date;

    @IsString()
    @MinLength(1)
    @IsOptional()
    updateDocumentUserAt: string;

    @IsDate()
    @IsOptional()
    updateDateAt: Date;

}
