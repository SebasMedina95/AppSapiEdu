import { BeforeInsert, BeforeUpdate, Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn } from "typeorm";
import { Person } from '../../persons/entities/person.entity';
import { PermitAssignment } from './permit-assignment.entity';

@Entity({
name: "USU_USUARIO"
})
export class User {

@PrimaryGeneratedColumn({
   name: "USU_CODIGO",
   comment: 'Clave primaria de tabla'
})
id: number;

@Column({
   name: "USU_USUARIO",
   type: 'varchar',
   unique: true,
   length: 50,
   comment: 'Nickname del usuario'
})
user: string;

@Column({
   name: "USU_PASSWORD",
   type: 'varchar',
   length: 100,
   comment: 'Contraseña del usuario'
})
password: string;

@Column({
    name: "USU_ESTADO",
    type: 'boolean',
    default: true,
    comment: 'Estado del usuario'
 })
 status: boolean;

@Column({
   name: "USU_VALIDADO",
   type: 'boolean',
   default: false,
   comment: 'Usuario validado'
})
isValid: boolean;

@Column({
   name: "USU_AVATAR",
   type: 'varchar',
   default: "default.png",
   nullable: true,
   comment: 'Imagen del usuario'
})
avatar: string;

@Column({
   name: "USU_USUARIO_CREO",
   type: 'varchar',
   length: 30,
   nullable: true,
   comment: 'Documento de usuario que creó'
})
createDocumentUserAt?: string;

@Column({
   name: "USU_FECHA_CREACION",
   type: 'timestamp',
   nullable: true,
   comment: 'Fecha creación'
})
createDateAt?: Date;

@Column({
   name: "USU_USUARIO_ACTUALIZACION",
   type: 'varchar',
   length: 30,
   nullable: true,
   comment: 'Documento de usuario que actualizó'
})
updateDocumentUserAt?: string;

@Column({
   name: "USU_FECHA_ACTUALIZACION",
   type: 'timestamp',
   nullable: true,
   comment: 'Fecha creación'
})
updateDateAt?: Date;

//* ********************** *//
//* ***** RELACIONES ***** *//
//* ********************** *//

@ManyToOne( () => Person, (person) => person.users, {eager  : true})
@JoinColumn({ name: 'FK_PERSONA' })
person?: Person | number

@OneToMany( () => PermitAssignment, (permit) => permit.user, {eager  : true})
permit?: PermitAssignment[];

//* ********************************************** *//
//* ***** ANTES DE IMPACTAR LA BASE DE DATOS ***** *//
//* ********************************************** *//
@BeforeInsert()
checkFildsBeforeInsert(){
   this.user = this.user.trim();
   this.password = this.password.trim();
}

@BeforeUpdate()
checkFildsBeforeUpdate(){
   this.checkFildsBeforeInsert();
}

}
