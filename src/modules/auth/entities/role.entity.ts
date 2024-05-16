import { PermitAssignment } from './permit-assignment.entity';
import { Column,
         Entity,
         OneToMany,
         PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "ROL_ROLES"
})
export class Role {

    @PrimaryGeneratedColumn({
        name: "ROL_CODIGO",
        comment: 'Clave primaria de tabla'
    })
    id: number;

    @Column({
        name: "ROL_ROL",
        type: 'varchar',
        length: 50,
        comment: 'Nombre del rol'
    })
    rolName: string;

    @Column({
        name: "ROL_DESCRIPCION",
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Descripción del rol'
    })
    description: string;

    //* ********************** *//
    //* ***** RELACIONES ***** *//
    //* ********************** *//

    @OneToMany( () => PermitAssignment, (permit) => permit.role)
    permit?: PermitAssignment[];

}