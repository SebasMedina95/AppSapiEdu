import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({ message: "El usuario es requerido" })
    @IsString({ message: "El usuario debe ser un String válido" })
    @MinLength(5, { message: "El usuario debe tener al menos 5 caracteres" })
    user: string;

    @IsNotEmpty({ message: "El password es requerido" })
    @IsString({ message: "El password debe ser un String válido" })
    @MinLength(8, { message: "El password debe tener al menos 8 caracteres" })
    password: string;

}
