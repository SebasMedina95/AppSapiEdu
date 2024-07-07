import { ApiProperty } from "@nestjs/swagger";
import { IsIn,
         IsNotEmpty,
         IsNumber,
         IsString,
         MaxLength,
         MinLength } from "class-validator";
import { PosPreOrigin } from "../../../modules/pos-pre-origin/entities/pos-pre-origin.entity";

export class CreatePosPreSapiDto {

    //? Esto lo vamos a calcular gracias al PosPreOrig y el Consecutivo
    // @ApiProperty({
    //     example: "911000000290",
    //     description: "Número de posición presupuestal Sapi",
    //     uniqueItems: true,
    // })
    // @IsString({ message: "El número de la Posición Presupuestal Sapi debe ser un String válido" })
    // @MinLength(12, { message: "El número de la Posición Presupuestal Sapi debe tener al menos 12 caracteres" })
    // @MaxLength(30, { message: "El número de la Posición Presupuestal Sapi no puede exceder los 30 caracteres" })
    // @IsNotEmpty({ message: "El número de la Posición Presupuestal Sapi es requerido" })
    // numberName: string;

    @ApiProperty({
        example: "2024",
        description: "Ejercicio de la posición presupuestal Sapi",
    })
    @IsNumber({}, { message: "El ejercicio de la Posición Presupuestal Sapi debe ser un Número válido" })
    @IsNotEmpty({ message: "El ejercicio de la Posición Presupuestal Sapi es requerido" })
    exercise: number;

    @ApiProperty({
        example: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        description: "Descripción de la posición presupuestal Sapi",
        uniqueItems: true,
    })
    @IsString({ message: "La descripción de la Posición Presupuestal Sapi debe ser un String válido" })
    @MinLength(1, { message: "La descripción de la Posición Presupuestal Sapi debe tener al menos 1 caracteres" })
    @MaxLength(200, { message: "La descripción de la Posición Presupuestal Sapi no puede exceder los 200 caracteres" })
    @IsNotEmpty({ message: "La descripción de la Posición Presupuestal Sapi es requerido" })
    description: string;

    @ApiProperty({
        example: "001.",
        description: "Consecutivo de la posición presupuestal Sapi",
    })
    @IsString({ message: "El Consecutivo de la Posición Presupuestal Sapi debe ser un String válido" })
    @MinLength(3, { message: "El Consecutivo de la Posición Presupuestal Sapi debe tener al menos 3 caracteres" })
    @MaxLength(3, { message: "El Consecutivo de la Posición Presupuestal Sapi no puede exceder los 3 caracteres" })
    @IsNotEmpty({ message: "El Consecutivo de la Posición Presupuestal Sapi es requerido" })
    consecutive: string;

    @ApiProperty({
        example: "PRESUPUESTO",
        description: "Asignado a de la posición presupuestal Sapi",
    })
    @IsIn(['PRESUPUESTO', 'FUNCIONAMIENTO', 'INVERSION', 'FONDOS', 'USUARIOS'], { message: "El tipo de asignación a debe ser válido" })
    assignedTo: string;

    @IsNumber({}, { message: "La posición presupuestal de origen de la Posición Presupuestal Sapi debe ser un String válido" })
    @IsNotEmpty({ message: "La posición presupuestal de origen de la Posición Presupuestal Sapi es requerido" })
    posPreOrigin?: PosPreOrigin | number;

}
