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

    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly search?: string = "";

    get skip(): number {
        return (this.page - 1) * this.take;
    }

}