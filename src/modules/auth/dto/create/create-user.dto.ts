import { IsBoolean,
         IsDate,
         IsNotEmpty,
         IsOptional,
         IsString,
         Matches,
         MaxLength,
         MinLength } from "class-validator";
import { Person } from "src/modules/persons/entities/person.entity";
import { PermitAssignment } from "../../entities/permit-assignment.entity";

export class CreateUserDto {

    @IsString({ message: "El nombre de usuario debe ser válido" })
    @MinLength(5, { message: "El nombre de usuario debe tener al menos 5 caracteres" })
    @MaxLength(50, { message: "El nombre de usuario no puede exceder los 50 caracteres" })
    user: string;

    @IsString({ message: "La contraseña debe ser válido" })
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    @MaxLength(100, { message: "La contraseña no puede exceder los 100 caracteres" })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsBoolean()
    @IsOptional()
    isValid: boolean;

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

    @IsNotEmpty()
    person: Person | number;

    @IsNotEmpty()
    permit: PermitAssignment[] | number[];

}
