import { ApiProperty } from "@nestjs/swagger";
import { ManagementCenter } from "../entities/management-center.entity";


export class MetaResponse {

    @ApiProperty({ example: "OK", description: 'Centro Gestor' })
    code: string;

    @ApiProperty({ example: "Centro Gestor obtenido correctamente", description: 'Centro Gestor' })
    message: string;

}

export class ManagementCenterResponse {

    @ApiProperty({ type: ManagementCenter, description: 'Centro Gestor' })
    data: ManagementCenter;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;

}
