import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum,
         IsInt,
         IsOptional,
         IsString,
         Max,
         Min,
         MinLength } from "class-validator";

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export class PageOptionsDto {

    @ApiProperty({ example: "ASC", description: 'Ordenamiento de resultado' })
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @ApiProperty({ example: 1, description: 'Página actual' })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @ApiProperty({ example: 10, description: 'Cantidad por página' })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    @ApiProperty({ example: "sede", description: 'Parámetro de busqueda para filtrar' })
    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly search?: string = "";

    get skip(): number {
        return (this.page - 1) * this.take;
    }

}