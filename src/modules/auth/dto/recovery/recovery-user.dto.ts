import { IsEmail,
         IsNotEmpty,
         IsString,
         MaxLength } from "class-validator";

export class RecoveryUserDto {

    @IsNotEmpty({ message: "El email es requerido" })
    @IsString({ message: "El usuario debe ser un String válido" })
    @IsEmail({}, { message: "El email debe ser válido" })
    @MaxLength(150, {message: "El email no debe sobrepasar los 150 caracteres"})
    email: string;

}
