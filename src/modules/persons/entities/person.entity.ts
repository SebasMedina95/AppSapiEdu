import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/auth/entities/user.entity";
import { Campus } from "src/modules/campus/entities/campus.entity";
import { BeforeInsert, BeforeUpdate, Column,
         Entity,
         JoinColumn,
         ManyToOne,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "PER_PERSONAS"
})
export class Person {

    @ApiProperty({
        example: 1,
        description: "Id de persona autogenerado",
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn({
        name: "PER_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @ApiProperty({
        example: "CC",
        description: "Tipo de documento de la persona",
    })
    @Column({
        name: "PER_TIPO_DOCUMENTO",
        type: 'varchar',
        length: 30,
        comment: 'Tipo Documento de la Persona'
    })
    documentType: string;

    @ApiProperty({
        example: "123456789",
        description: "Número de documento de la persona",
    })
    @Column({
        name: "PER_DOCUMENTO",
        type: 'varchar',
        unique: true,
        length: 50,
        comment: 'Documento de la Persona'
    })
    document: string;

    @ApiProperty({
        example: "Juan Sebastian",
        description: "Nombres de la persona",
    })
    @Column({
        name: "PER_NOMBRES",
        type: 'varchar',
        length: 100,
        comment: 'Nombres de la Persona'
    })
    names: string;

    @ApiProperty({
        example: "Medina Toro",
        description: "Apellidos de la persona",
    })
    @Column({
        name: "PER_APELLIDOS",
        type: 'varchar',
        length: 100,
        comment: 'Apellidos de la Persona'
    })
    lastNames: string;

    @ApiProperty({
        example: "M",
        description: "Género de la persona",
    })
    @Column({
        name: "PER_GENERO",
        type: 'varchar',
        length: 2,
        comment: 'Sexualidad de la Persona'
    })
    gender: string;

    @ApiProperty({
        example: "Carrera 46a # 121 - 43",
        description: "Dirección residencial de la persona",
        required: false,
    })
    @Column({
        name: "PER_DIRECCION",
        type: 'varchar',
        length: 150,
        nullable: true,
        comment: 'Dirección Residencial de la Persona'
    })
    address: string;

    @ApiProperty({
        example: "3127819911",
        description: "Teléfono de la persona",
        required: false,
    })
    @Column({
        name: "PER_TELEFONO",
        type: 'varchar',
        length: 60,
        nullable: true,
        comment: 'Celular de la Persona'
    })
    phone: string;

    @ApiProperty({
        example: "jsebastianmedina@correo.com",
        description: "Email de la persona",
        uniqueItems: true,
    })
    @Column({
        name: "PER_EMAIL",
        type: 'varchar',
        length: 150,
        unique: true,
        comment: 'Correo Electrónico de la Persona'
    })
    email: string;

    @ApiProperty({
        example: "1995-05-02",
        description: "Fecha nacimiento de la persona",
        required: false,
    })
    @Column({
        name: "PER_FECHA_NACIMIENTO",
        type: 'date',
        nullable: true,
        comment: 'Fecha Nacimiento de la Persona'
    })
    birthDate: Date;

    @ApiProperty({
        example: "O+",
        description: "Tipo de sangre de la persona",
        required: false,
    })
    @Column({
        name: "PER_TIPO_SANGRE",
        type: 'varchar',
        nullable: true,
        length: 5,
        comment: 'Tipo de Sangre'
    })
    bloodType: string;

    @ApiProperty({
        example: "A1",
        description: "Tipo de persona (A1 por APP, A2 por PQRS, A3 por Otro)",
    })
    @Column({
        name: "PER_TIPO",
        type: 'varchar',
        length: 2,
        comment: 'Tipo de persona (A1 por APP, A2 por PQRS, A3 por Otro)'
    })
    type: string;

    @ApiProperty({
        example: true,
        description: "Estado lógico de eliminación de la persona",
        default: true
    })
    @Column({
        name: "PER_ESTADO",
        type: 'boolean',
        comment: 'Estado Lógico de la Persona',
        default: true
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

    @ApiProperty({
        example: {
            id: 1,
            name: "Sede Norte A - Edificio Inteligente",
            address: "Carrera 43A # 33C - 109",
            phone1: "6042546509",
            phone2: "6043829222",
            email1: "sede1.atencionalcliente@sapiedu.com",
            email2: "recursoshumanos@sapiedu.com",
            description: "Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera.",
            status: true,
            createDocumentUserAt: "123456789",
            createDateAt: "2024-05-25",
            updateDocumentUserAt: "123456789",
            updateDateAt: "2024-05-25",
        },
        description: "Sede asociada a la persona"
    })
    @ManyToOne( () => Campus, (campus) => campus.persons, {eager  : true})
    @JoinColumn({ name: 'FK_SEDE' })
    campus?: Campus | number

    @OneToMany( () => User, (user) => user.person)
    public users?: User[];

    //* ****************************************** *//
    //* ***** AJUSTE DATA ANTES DE ORGANIZAR ***** *//
    //* ****************************************** *//
    @BeforeInsert()
    checkFildsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
        this.document = this.document.trim();
        this.email = this.email.trim();
        this.address = this.address.trim();
        this.phone = this.phone.trim();
        this.names = this.names.trim();
        this.lastNames = this.lastNames.trim();
    }

    @BeforeUpdate()
    checkFildsBeforeUpdate(){
        this.checkFildsBeforeInsert();
    }

}

