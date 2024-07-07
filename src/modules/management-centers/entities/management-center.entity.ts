import { ApiProperty } from "@nestjs/swagger";
import { Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";
import { PosPreOrigin } from "../../../modules/pos-pre-origin/entities/pos-pre-origin.entity";

@Entity({
    name: "CEG_CENTROS_GESTORES"
})
export class ManagementCenter {

    @ApiProperty({
        example: 1,
        description: "Id de centro gestor autogenerado",
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn({
        name: "CEG_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @ApiProperty({
        example: "SIPI - Gestor de Fondos",
        description: "Nombre completo del centro gestor",
        uniqueItems: true,
    })
    @Column({
        name: "CEG_NOMBRE",
        type: 'varchar',
        length: 250,
        unique: true,
        comment: 'Nombre del centro gestor'
    })
    name: string;

    @ApiProperty({
        example: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.",
        description: "Descripción del centro gestor",
        required: false,
    })
    @Column({
        name: "CEG_DESCRIPCION",
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Descripción adicional del centro gestor'
    })
    description: string;

    @ApiProperty({
        example: "true",
        description: "Estado de eliminación lógico",
        required: false,
    })
    @Column({
        name: "CAM_ESTADO",
        type: 'boolean',
        default: true,
        comment: 'Estado lógico de eliminación del centro gestor'
    })
    status: boolean;

    @ApiProperty({
        example: "123456789",
        description: "Documento de Usuario que creó del centro gestor",
        required: false,
    })
    @Column({
        name: "PER_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que creó'
    })
    createDocumentUserAt?: string;

    @ApiProperty({
        example: "2024-05-24",
        description: "Fecha de creación del centro gestor",
        required: false,
    })
    @Column({
        name: "PER_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    createDateAt?: Date;

    @ApiProperty({
        example: "123456789",
        description: "Documento de Usuario que actualizó del centro gestor",
        required: false,
    })
    @Column({
        name: "PER_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que actualizó'
    })
    updateDocumentUserAt?: string;

    @ApiProperty({
        example: "2024-05-24",
        description: "Fecha de actualización del centro gestor",
        required: false,
    })
    @Column({
        name: "PER_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha actualización'
    })
    updateDateAt?: Date;

    @OneToMany( () => PosPreOrigin, (posPreOrigin) => posPreOrigin.managementCenter)
    public posPresOrigins?: PosPreOrigin[];

}
