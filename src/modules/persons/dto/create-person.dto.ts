import { IsDate,
         IsEmail,
         IsIn,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";

export class CreatePersonDto {

    @IsIn(['TI', 'CC', 'LM', 'NIT', 'CE'])
    documentType: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    document: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    names: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    lastNames: string;

    @IsIn(['M', 'F', 'NA'])
    gender: string;

    @IsString()
    @MinLength(1)
    @MaxLength(150)
    @IsOptional()
    address: string;

    @IsString()
    @MinLength(1)
    @MaxLength(60)
    @IsOptional()
    phone: string;

    @IsEmail()
    @MaxLength(150)
    email: string;

    @IsDate()
    @IsOptional()
    birthDate: Date;

    @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    bloodType: string;

    @IsString()
    @MinLength(1)
    logicStatus: string;

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

