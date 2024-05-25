import { ApiProperty } from "@nestjs/swagger";
import { Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";
import { Person } from "src/modules/persons/entities/person.entity";


@Entity({
    name: "CAM_CAMPUS"
})
export class Campus {

    @ApiProperty({
        example: 4,
        description: "Id de campus autogenerado",
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn({
        name: "PER_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @ApiProperty({
        example: "Sede Valle - Edificio Montana Norte",
        description: "Nombre completo del campus",
        uniqueItems: true,
    })
    @Column({
        name: "CAM_NOMBRE",
        type: 'varchar',
        length: 200,
        comment: 'Nombre de la Sede'
    })
    name: string;

    @ApiProperty({
        example: "Calle 17A # 45 - 123 Edificio X",
        description: "Dirección del campus",
    })
    @Column({
        name: "CAM_DIRECCION",
        type: 'varchar',
        length: 150,
        comment: 'Dirección de la Sede'
    })
    address: string;

    @ApiProperty({
        example: "6042329812",
        description: "Número de teléfono 1 del campus",
    })
    @Column({
        name: "CAM_TELEFONO1",
        type: 'varchar',
        length: 100,
        comment: 'Teléfono 1 de la Sede'
    })
    phone1: string;

    @ApiProperty({
        example: "6042329111",
        description: "Número de teléfono 2 del campus",
        required: false,
    })
    @Column({
        name: "CAM_TELEFONO2",
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: 'Teléfono 2 de la Sede'
    })
    phone2: string;

    @ApiProperty({
        example: "correo-sede1@correo.com",
        description: "Correo Electrónico # 1 de la Sede",
    })
    @Column({
        name: "CAM_EMAIL1",
        type: 'varchar',
        length: 150,
        comment: 'Email 1 de la Sede'
    })
    email1: string;

    @ApiProperty({
        example: "correo-sede2@correo.com",
        description: "Correo Electrónico # 2 de la Sede",
        required: false,
    })
    @Column({
        name: "CAM_EMAIL2",
        type: 'varchar',
        length: 150,
        nullable: true,
        comment: 'Email 2 de la Sede'
    })
    email2: string;

    @ApiProperty({
        example: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.",
        description: "Descripción de la Sede",
        required: false,
    })
    @Column({
        name: "CAM_DESCRIPCION",
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Descripción adicional de la Sede'
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
        comment: 'Estado lógico de eliminación de la Sede'
    })
    status: boolean;

    @ApiProperty({
        example: "123456789",
        description: "Documento de Usuario que creó la Sede",
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
        description: "Fecha de creación de la Sede",
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
        description: "Documento de Usuario que actualizó la Sede",
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
        description: "Fecha de actualización de la Sede",
        required: false,
    })
    @Column({
        name: "PER_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha actualización'
    })
    updateDateAt?: Date;

    //* ********************** *//
    //* ***** RELACIONES ***** *//
    //* ********************** *//

    @OneToMany( () => Person, (person) => person.campus)
    public persons?: Person[];

}

