import { Column,
         Entity,
         JoinColumn,
         ManyToOne,
         PrimaryGeneratedColumn } from "typeorm";
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({
    name: "PAS_PERMISOS_ASIGNADOS"
})
export class PermitAssignment {

    @PrimaryGeneratedColumn({
        name: "PAS_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @Column({
        name: "PAS_USUARIO_CREACION",
        type: 'varchar',
        length: 30,
        comment: 'Documento de usuario que creó'
    })
    createDocumentUserAt?: string;

    @Column({
        name: "PAS_FECHA_CREACION",
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha creación'
    })
    createDateAt?: Date;

    //* ********************** *//
    //* ***** RELACIONES ***** *//
    //* ********************** *//

    @ManyToOne( () => Role, (role) => role.permit)
    @JoinColumn({ name: 'FK_ROL' })
    role?: Role | number

    @ManyToOne( () => User, (user) => user.permit)
    @JoinColumn({ name: 'FK_USUARIO' })
    user?: User | number

}
