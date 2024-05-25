import { ApiProperty } from "@nestjs/swagger";
import { Person } from "../entities/person.entity";

export class MetaResponse {

    @ApiProperty({ example: "OK", description: 'Persona' })
    code: string;

    @ApiProperty({ example: "Persona obtenida correctamente", description: 'Persona' })
    message: string;

}

export class PersonResponse {

    @ApiProperty({ type: Person, description: 'Persona' })
    data: Person;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;


}
