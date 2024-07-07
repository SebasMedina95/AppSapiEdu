import { ApiProperty } from "@nestjs/swagger";
import { Column,
         Entity,
         PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "ECO_ENTIDADES_CONTROL"
})
export class ControlEntity {

    @ApiProperty({
        example: 1,
        description: "Id de Entidad de Control",
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn({
        name: "ECO_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @ApiProperty({
        example: "Entidad de Apoyo a Pregrados",
        description: "Nombre de la Entidad de Control",
        uniqueItems: true,
    })
    @Column({
        name: "ECO_NOMBRE",
        type: 'varchar',
        unique: true,
        length: 200,
        comment: 'Nombre de la Entidad de Control'
    })
    name: string;

    @ApiProperty({
        example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue eros, pharetra eget risus eu, tristique vulputate magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam tincidunt nisi vel quam convallis venenatis.",
        description: "Descripción de la Entidad de Control"
    })
    @Column({
        name: "ECO_DESCRIPCION",
        type: 'varchar',
        length: 5000,
        nullable: true,
        comment: 'Descripción de la Entidad de control'
    })
    description: string;

    @ApiProperty({
        example: "true",
        description: "Estado de eliminación lógico",
        required: false,
    })
    @Column({
        name: "ECO_ESTADO",
        type: 'boolean',
        default: true,
        comment: 'Estado lógico de eliminación de la Entidad de Control'
    })
    status: boolean;

    @ApiProperty({
        example: "123456789",
        description: "Documento de Usuario que creó la Entidad de Control",
        required: false,
    })
    @Column({
        name: "ECO_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que creó'
    })
    createDocumentUserAt?: string;

    @ApiProperty({
        example: "2024-05-24",
        description: "Fecha de creación de la Entidad de Control",
        required: false,
    })
    @Column({
        name: "ECO_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    createDateAt?: Date;

    @ApiProperty({
        example: "123456789",
        description: "Documento de Usuario que actualizó la Entidad de Control",
        required: false,
    })
    @Column({
        name: "ECO_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que actualizó'
    })
    updateDocumentUserAt?: string;

    @ApiProperty({
        example: "2024-05-24",
        description: "Fecha de actualización de la Entidad de Control",
        required: false,
    })
    @Column({
        name: "ECO_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha actualización'
    })
    updateDateAt?: Date;

}
