import { ApiProperty } from "@nestjs/swagger";
import { Column,
         Entity,
         JoinColumn,
         ManyToOne,
         PrimaryGeneratedColumn } from "typeorm";
import { PosPreOrigin } from "../../../modules/pos-pre-origin/entities/pos-pre-origin.entity";

@Entity({
    name: "PPS_POSICIONES_PRESUPUESTARIAS_SAPI"
})
export class PosPreSapi {

    @ApiProperty({
        example: 1,
        description: "Id de posición presupuestal sapi autogenerado",
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn({
        name: "PPS_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @ApiProperty({
        example: "911000000290-001",
        description: "Número de posición presupuestal sapi",
        uniqueItems: true,
    })
    @Column({
        name: "PPS_NUMERO",
        type: 'varchar',
        length: 30,
        unique: true,
        comment: 'Número de posición presupuestal sapi'
    })
    numberName: string;

    @ApiProperty({
        example: "2024",
        description: "Ejercicio de la posición presupuestal sapi",
    })
    @Column({
        name: "PPS_EJERCICIO",
        type: 'integer',
        comment: 'Ejercicio de aplicación de posición presupuestal sapi'
    })
    exercise: number;

    @ApiProperty({
        example: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        description: "Descripción de la posición presupuestal sapi",
        uniqueItems: true,
    })
    @Column({
        name: "PPS_DESCRIPCION",
        type: 'varchar',
        length: 500,
        unique: true,
        comment: 'Descripción de la posición presupuestal sapi'
    })
    description: string;

    @ApiProperty({
        example: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        description: "Descripción de la posición presupuestal sapi",
        uniqueItems: true,
    })
    @Column({
        name: "PPS_CONSECUTIVO",
        type: 'varchar',
        length: 3,
        comment: 'Consecutivo de la posición presupuestal sapi'
    })
    consecutive: string;

    @ApiProperty({
        example: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        description: "Descripción de la posición presupuestal sapi",
        uniqueItems: true,
    })
    @Column({
        name: "PPS_ASIGNADO_A",
        type: 'varchar',
        length: 40,
        comment: 'Asignado a de la posición presupuestal sapi'
    })
    assignedTo: string;

    @ApiProperty({
        example: "true",
        description: "Estado de eliminación lógico",
        required: false,
    })
    @Column({
        name: "PPS_ESTADO",
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
        name: "PPS_USUARIO_CREACION",
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
        name: "PPS_FECHA_CREACION",
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
        name: "PPS_USUARIO_ACTUALIZACION",
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
        name: "PPS_FECHA_ACTUALIZACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha actualización'
    })
    updateDateAt?: Date;

    @ApiProperty({
        example: {
            id: 1,
            numberName: "911000000290",
            exercise: 2024,
            denomination: "Lorem Ipsum has been the industry's, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
            status: true,
            createDocumentUserAt: "1216717949",
            createDateAt: "2024-06-11T01:50:54.961Z",
            updateDocumentUserAt: "1216717949",
            updateDateAt: "2024-06-11T01:50:54.961Z",
            managementCenter: {
                id: 1,
                name: "SAPI - Gestor General de Control",
                description: "SAPI - Gestor General de Control. Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident. ",
                status: false,
                createDocumentUserAt: "1216717949",
                createDateAt: "2024-06-08T20:04:09.862Z",
                updateDocumentUserAt: "1216717949",
                updateDateAt: "2024-06-08T21:24:37.593Z"
            }
        },
        description: 'Posición Presupuestal de Origen Asociada',
      })
    @ManyToOne(() => PosPreOrigin, (posPreOrigin) => posPreOrigin.posPresOrigins, { eager: true })
    @JoinColumn({ name: 'FK_POS_PRE_ORIGIN' })
    posPreOrigin?: PosPreOrigin | number;

}
