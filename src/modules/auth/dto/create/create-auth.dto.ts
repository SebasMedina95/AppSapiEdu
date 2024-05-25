import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

    @ApiProperty({
        example: "Sebas123",
        description: "Usuario/Nickname de usuario para login",
        uniqueItems: true,
    })
    @IsNotEmpty({ message: "El usuario es requerido" })
    @IsString({ message: "El usuario debe ser un String válido" })
    @MinLength(5, { message: "El usuario debe tener al menos 5 caracteres" })
    user: string;

    @ApiProperty({
        example: "Sebas123",
        description: "Contraseña de usuario para login",
    })    
    @IsNotEmpty({ message: "El password es requerido" })
    @IsString({ message: "El password debe ser un String válido" })
    @MinLength(8, { message: "El password debe tener al menos 8 caracteres" })
    password: string;

}
