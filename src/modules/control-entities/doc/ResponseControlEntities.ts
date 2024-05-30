import { ApiProperty } from "@nestjs/swagger";
import { ControlEntity } from "../entities/control-entity.entity";


export class MetaResponse {

    @ApiProperty({ example: "OK", description: 'Entidad de Control' })
    code: string;

    @ApiProperty({ example: "Entidad de Control obtenida correctamente", description: 'Entidad de Control' })
    message: string;

}

export class ControlEntityResponse {

    @ApiProperty({ type: ControlEntity, description: 'Entidad de Control' })
    data: ControlEntity;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;

}