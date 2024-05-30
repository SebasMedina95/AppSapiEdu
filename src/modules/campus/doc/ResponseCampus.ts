import { ApiProperty } from "@nestjs/swagger";
import { Campus } from "../entities/campus.entity";

export class MetaResponse {

    @ApiProperty({ example: "OK", description: 'Campus' })
    code: string;

    @ApiProperty({ example: "Campus obtenido correctamente", description: 'Campus' })
    message: string;

}

export class CampusResponse {

    @ApiProperty({ type: Campus, description: 'Campus' })
    data: Campus;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;

}
