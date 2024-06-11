import { ApiProperty } from "@nestjs/swagger";
import { PosPreOrigin } from "../entities/pos-pre-origin.entity";


export class MetaResponse {

    @ApiProperty({ example: "OK", description: 'Posición Presupuestal de Origen' })
    code: string;

    @ApiProperty({ example: "Posición Presupuestal de Origen obtenida correctamente", description: 'Posición Presupuestal de Origen' })
    message: string;

}

export class PosPreOrigResponse {

    @ApiProperty({ type: PosPreOrigin, description: 'Posición Presupuestal de Origen' })
    data: PosPreOrigin;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;


}
