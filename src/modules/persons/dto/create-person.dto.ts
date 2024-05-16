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

    @IsIn(['TI', 'CC', 'LM', 'NIT', 'CE'], { message: "El tipo de documento debe ser válido" })
    documentType: string;

    @IsString({ message: "El número de documento debe ser válido" })
    @MinLength(5, { message: "El número de documento debe tener al menos 5 caracteres" })
    @MaxLength(50, { message: "El número de documento no puede exceder los 50 caracteres" })
    document: string;

    @IsString({ message: "Los nombres deben ser válidos" })
    @MinLength(3, { message: "Los nombres deben tener al menos 3 caracteres" })
    @MaxLength(100, { message: "Los nombres no puede exceder los 100 caracteres" })
    names: string;

    @IsString({ message: "Los apellidos deben ser válidos" })
    @MinLength(3, { message: "Los apellidos deben tener al menos 5 caracteres" })
    @MaxLength(100, { message: "Los apellidos no puede exceder los 100 caracteres" })
    lastNames: string;

    @IsIn(['M', 'F', 'NA'], { message: "El género debe ser válido" })
    gender: string;

    @IsString({ message: "La dirección debe ser válido" })
    @MinLength(1, { message: "La dirección debe tener al menos 1 caractere" })
    @MaxLength(150, { message: "La dirección no puede exceder los 150 caracteres" })
    @IsOptional()
    address: string;

    @IsString({ message: "El teléfono debe ser válido" })
    @MinLength(1, { message: "El teléfono debe tener al menos 1 caractere" })
    @MaxLength(60, { message: "El teléfono no puede exceder los 60 caracteres" })
    @IsOptional()
    phone: string;

    @IsEmail({}, { message: "El email debe ser un email válido" })
    @MaxLength(150, { message: "El email no puede exceder los 150 caracteres" })
    email: string;

    @IsDate({ message: "La fecha de nacimiento debe ser válida" })
    @IsOptional()
    birthDate: Date;

    @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { message: "El tipo de sangre debe ser válido" })
    bloodType: string;

    @IsIn(['A1', 'A2', 'A3'], { message: "El tipo de persona debe ser válido" })
    type: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    // REQUERIDO PARA LAS RELACIONES
    @IsNumber({}, { message: "El campus de registro de la persona es requerido" })
    campus: ICampus | number;

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

