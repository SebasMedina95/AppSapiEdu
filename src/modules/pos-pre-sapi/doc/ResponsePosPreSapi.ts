import { ApiProperty } from "@nestjs/swagger";
import { PosPreSapi } from "../entities/pos-pre-sapi.entity";

export class MetaResponse {

    @ApiProperty({ example: "OK", description: 'Posición Presupuestal Sapi' })
    code: string;

    @ApiProperty({ example: "Posición Presupuestal Sapi obtenida correctamente", description: 'Posición Presupuestal Sapi' })
    message: string;

}

export class PosPreSapiResponse {

    @ApiProperty({ type: PosPreSapi, description: 'Posición Presupuestal Sapi' })
    data: PosPreSapi;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;

}
