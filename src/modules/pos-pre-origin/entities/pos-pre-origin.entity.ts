import { ApiProperty } from "@nestjs/swagger";
import { Column,
         Entity,
         JoinColumn,
         ManyToOne,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";
import { ManagementCenter } from "../../../modules/management-centers/entities/management-center.entity";
import { PosPreSapi } from "../../../modules/pos-pre-sapi/entities/pos-pre-sapi.entity";

@Entity({
    name: "PPR_POSICIONES_PRESUPUESTARIAS_ORIGEN"
})
export class PosPreOrigin {
    
    @ApiProperty({
        example: 1,
        description: "Id de posición presupuestal de origen autogenerado",
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn({
        name: "PPR_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @ApiProperty({
        example: "911000000290",
        description: "Número de posición presupuestal de origen",
        uniqueItems: true,
    })
    @Column({
        name: "PPR_NUMERO",
        type: 'varchar',
        length: 30,
        unique: true,
        comment: 'Número de posición presupuestal de origen'
    })
    numberName: string;

    @ApiProperty({
        example: "2024",
        description: "Ejercicio de la posición presupuestal de origen",
    })
    @Column({
        name: "PPR_EJERCICIO",
        type: 'integer',
        comment: 'Ejercicio de aplicación de posición presupuestal de origen'
    })
    exercise: number;

    @ApiProperty({
        example: "Lorem Ipsum has been the industry's, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        description: "Denominación de la posición presupuestal de origen",
        uniqueItems: true,
    })
    @Column({
        name: "PPR_DENOMINACION",
        type: 'varchar',
        length: 200,
        unique: true,
        comment: 'Denominación de la posición presupuestal de origen'
    })
    denomination: string;

    @ApiProperty({
        example: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        description: "Descripción de la posición presupuestal de origen",
        uniqueItems: true,
    })
    @Column({
        name: "PPR_DESCRIPCION",
        type: 'varchar',
        length: 500,
        unique: true,
        comment: 'Descripción de la posición presupuestal de origen'
    })
    description: string;

    @ApiProperty({
        example: "true",
        description: "Estado de eliminación lógico",
        required: false,
    })
    @Column({
        name: "PPR_ESTADO",
        type: 'boolean',
        default: true,
        comment: 'Estado lógico de eliminación de la posición presupuestal de origen'
    })
    status: boolean;

    @ApiProperty({
        example: "123456789",
        description: "Documento de Usuario que creó de la posición presupuestal de origen",
        required: false,
    })
    @Column({
        name: "PPR_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que creó'
    })
    createDocumentUserAt?: string;

    @ApiProperty({
        example: "2024-05-24",
        description: "Fecha de creación de la posición presupuestal de origen",
        required: false,
    })
    @Column({
        name: "PPR_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    createDateAt?: Date;

    @ApiProperty({
        example: "123456789",
        description: "Documento de Usuario que actualizó de la posición presupuestal de origen",
        required: false,
    })
    @Column({
        name: "PPR_USUARIO_ACTUALIZACION",
        type: 'varchar',
        length: 30,
        nullable: true,
        comment: 'Documento de usuario que actualizó'
    })
    updateDocumentUserAt?: string;

    @ApiProperty({
        example: "2024-05-24",
        description: "Fecha de actualización de la posición presupuestal de origen",
        required: false,
    })
    @Column({
        name: "PPR_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha actualización'
    })
    updateDateAt?: Date;

    @ApiProperty({
        example: {
            name: "ABDS - Compensaciones Financieras",
            description: "ABDS - All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary. ",
            createDocumentUserAt: "1216717949",
            createDateAt: "2024-06-10T20:57:19.605Z",
            updateDocumentUserAt: "1216717949",
            updateDateAt: "2024-06-10T20:57:19.605Z",
            id: 6,
            status: true
        },
        description: 'Centro Gestor Asociado',
      })
    @ManyToOne(() => ManagementCenter, (managementCenter) => managementCenter.posPresOrigins, { eager: true })
    @JoinColumn({ name: 'FK_CENTRO_GESTOR' })
    managementCenter?: ManagementCenter | number;

    @OneToMany( () => PosPreSapi, (posPreSapi) => posPreSapi.posPreOrigin)
    public posPresOrigins?: PosPreSapi[];

}
