import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString,
    Matches,
    MaxLength, 
    MinLength
} from "class-validator";

export class RecoveryChangeUserDto {

    @ApiProperty({
        example: "SebasMedina123",
        description: "Nueva Contraseña de usuario para login",
    })
    @IsString({ message: "La nueva contraseña debe ser válido" })
    @MinLength(8, { message: "La nueva contraseña debe tener al menos 8 caracteres" })
    @MaxLength(100, { message: "La nueva contraseña no puede exceder los 100 caracteres" })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    newPassword: string;

    @ApiProperty({
        example: "SebasMedina123",
        description: "Verificación de nueva Contraseña de usuario para login",
    })
    @IsString({ message: "Verificación de la nueva contraseña debe ser válido" })
    @MinLength(8, { message: "Verificación de la nueva contraseña debe tener al menos 8 caracteres" })
    @MaxLength(100, { message: "Verificación de la nueva contraseña no puede exceder los 100 caracteres" })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    verifyNewPassword: string;

}