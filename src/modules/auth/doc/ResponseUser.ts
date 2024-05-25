import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class MetaResponse {

    @ApiProperty({ example: "OK", description: 'Usuario' })
    code: string;

    @ApiProperty({ example: "Usuario obtenido correctamente", description: 'Usuario' })
    message: string;

}

export class UserResponse {

    @ApiProperty({ type: User, description: 'Usuario' })
    data: User;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;


}

export class UserSimpleResponse {

    @ApiProperty({ type: Boolean, description: 'Usuario' })
    data: true;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;

}

export class UserWithTokenResponse {

    @ApiProperty({ type: User, description: 'Usuario' })
    user: User;

    @ApiProperty({ default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjIwLCJpYXQiOjE3MTY1OTAxMTEsImV4cCI6MTcxNjYwNDUxMX0.jtAXUfFx1Z_FdHKu9XTUzaTc6ynnSjHAlgTShtmIS7Y", type: String, description: 'Token de acceso' })
    token: string;

}

export class UserComplementaryResponse {

    @ApiProperty({ type: UserWithTokenResponse, description: 'Usuario' })
    data: UserWithTokenResponse;

    @ApiProperty({ type: MetaResponse, description: 'Meta Información' })
    meta: MetaResponse;

}
