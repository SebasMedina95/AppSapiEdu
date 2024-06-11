import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,
         IsNumber,
         IsString,
         MaxLength,
         MinLength } from "class-validator";
import { ManagementCenter } from "../../../modules/management-centers/entities/management-center.entity";

export class CreatePosPreOriginDto {

    @ApiProperty({
        example: "911000000290",
        description: "Número de posición presupuestal de origen",
        uniqueItems: true,
    })
    @IsString({ message: "El número de la Posición Presupuestal de Origen debe ser un String válido" })
    @MinLength(12, { message: "El número de la Posición Presupuestal de Origen debe tener al menos 12 caracteres" })
    @MaxLength(30, { message: "El número de la Posición Presupuestal de Origen no puede exceder los 30 caracteres" })
    @IsNotEmpty({ message: "El número de la Posición Presupuestal de Origen es requerido" })
    numberName: string;

    @ApiProperty({
        example: "2024",
        description: "Ejercicio de la posición presupuestal de origen",
    })
    @IsNumber({}, { message: "El ejercicio de la Posición Presupuestal de Origen debe ser un Número válido" })
    @IsNotEmpty({ message: "El ejercicio de la Posición Presupuestal de Origen es requerido" })
    exercise: number;

    @ApiProperty({
        example: "Lorem Ipsum has been the industry's, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        description: "Denominación de la posición presupuestal de origen",
        uniqueItems: true,
    })
    @IsString({ message: "La denominación de la Posición Presupuestal de Origen debe ser un String válido" })
    @MinLength(1, { message: "La denominación de la Posición Presupuestal de Origen debe tener al menos 1 caracteres" })
    @MaxLength(200, { message: "La denominación de la Posición Presupuestal de Origen no puede exceder los 200 caracteres" })
    @IsNotEmpty({ message: "La denominación de la Posición Presupuestal de Origen es requerido" })
    denomination: string;

    @ApiProperty({
        example: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        description: "Descripción de la posición presupuestal de origen",
        uniqueItems: true,
    })
    @IsString({ message: "La descripción de la Posición Presupuestal de Origen debe ser un String válido" })
    @MinLength(1, { message: "La descripción de la Posición Presupuestal de Origen debe tener al menos 1 caracteres" })
    @MaxLength(200, { message: "La descripción de la Posición Presupuestal de Origen no puede exceder los 200 caracteres" })
    @IsNotEmpty({ message: "La descripción de la Posición Presupuestal de Origen es requerido" })
    description: string;

    @IsNumber({}, { message: "El Centro Gestor de la Posición Presupuestal de Origen debe ser un String válido" })
    @IsNotEmpty({ message: "El Centro Gestor de la Posición Presupuestal de Origen es requerido" })
    managementCenter?: ManagementCenter | number;

}
