import { Campus } from "src/modules/campus/entities/campus.entity";
import { Column,
         Entity,
         JoinColumn,
         ManyToOne,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "PER_PERSONAS"
})
export class Person {

    @PrimaryGeneratedColumn({
        name: "PER_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @Column({
        name: "PER_TIPO_DOCUMENTO",
        type: 'varchar',
        length: 30,
        comment: 'Tipo Documento de la Persona'
    })
    documentType: string;

    @Column({
        name: "PER_DOCUMENTO",
        type: 'varchar',
        unique: true,
        length: 50,
        comment: 'Documento de la Persona'
    })
    document: string;

    @Column({
        name: "PER_NOMBRES",
        type: 'varchar',
        length: 100,
        comment: 'Nombres de la Persona'
    })
    names: string;

    @Column({
        name: "PER_APELLIDOS",
        type: 'varchar',
        length: 100,
        comment: 'Apellidos de la Persona'
    })
    lastNames: string;

    @Column({
        name: "PER_GENERO",
        type: 'varchar',
        length: 2,
        comment: 'Sexualidad de la Persona'
    })
    gender: string;

    @Column({
        name: "PER_DIRECCION",
        type: 'varchar',
        length: 150,
        nullable: true,
        comment: 'Dirección Residencial de la Persona'
    })
    address: string;

    @Column({
        name: "PER_TELEFONO",
        type: 'varchar',
        length: 60,
        nullable: true,
        comment: 'Celular de la Persona'
    })
    phone: string;

    @Column({
        name: "PER_EMAIL",
        type: 'varchar',
        length: 150,
        unique: true,
        comment: 'Correo Electrónico de la Persona'
    })
    email: string;

    @Column({
        name: "PER_FECHA_NACIMIENTO",
        type: 'date',
        nullable: true,
        comment: 'Fecha Nacimiento de la Persona'
    })
    birthDate: Date;

    @Column({
        name: "PER_TIPO_SANGRE",
        type: 'varchar',
        length: 5,
        comment: 'Tipo de Sangre'
    })
    bloodType: string;

    @Column({
        name: "PER_ESTADO",
        type: 'varchar',
        length: 1,
        comment: 'Estado Lógico de la Persona',
        default: 'S'
    })
    status: string;

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

    @ManyToOne( () => Campus, (campus) => campus.persons, {eager  : true})
    @JoinColumn({ name: 'FK_SEDE' })
    campus?: Campus | number

}

