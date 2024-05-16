import { Person } from "src/modules/persons/entities/person.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: "CAM_CAMPUS"
})
export class Campus {

    @PrimaryGeneratedColumn({
        name: "PER_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @Column({
        name: "CAM_NOMBRE",
        type: 'varchar',
        length: 200,
        comment: 'Nombre de la Sede'
    })
    name: string;

    @Column({
        name: "CAM_DIRECCION",
        type: 'varchar',
        length: 150,
        comment: 'Dirección de la Sede'
    })
    address: string;

    @Column({
        name: "CAM_TELEFONO1",
        type: 'varchar',
        length: 100,
        comment: 'Teléfono 1 de la Sede'
    })
    phone1: string;

    @Column({
        name: "CAM_TELEFONO2",
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: 'Teléfono 2 de la Sede'
    })
    phone2: string;

    @Column({
        name: "CAM_EMAIL1",
        type: 'varchar',
        length: 150,
        comment: 'Email 1 de la Sede'
    })
    email1: string;

    @Column({
        name: "CAM_EMAIL2",
        type: 'varchar',
        length: 150,
        nullable: true,
        comment: 'Email 2 de la Sede'
    })
    email2: string;

    @Column({
        name: "CAM_DESCRIPCION",
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Descripción adicional de la Sede'
    })
    description: string;

    @Column({
        name: "CAM_ESTADO",
        type: 'boolean',
        default: true,
        comment: 'Estado lógico de eliminación de la Sede'
    })
    status: boolean;

    @Column({
        name: "PER_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que creó'
    })
    createDocumentUserAt?: string;

    @Column({
        name: "PER_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    createDateAt?: Date;

    @Column({
        name: "PER_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que actualizó'
    })
    updateDocumentUserAt?: string;

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

