import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../persons/entities/person.entity';
import { PermitAssignment } from './permit-assignment.entity';

@Entity({
  name: 'USU_USUARIO',
})
export class User {
  @ApiProperty({
    example: 1,
    description: 'Id del usuario autogenerado',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn({
    name: 'USU_CODIGO',
    comment: 'Clave primaria de tabla',
  })
  id: number;

  @ApiProperty({
    example: 'Sebas123',
    description: 'Usuario/Nickname de usuario para login',
    uniqueItems: true,
  })
  @Column({
    name: 'USU_USUARIO',
    type: 'varchar',
    unique: true,
    length: 50,
    comment: 'Nickname del usuario',
  })
  user: string;

  @ApiProperty({
    example: '$2b$10$CMBQUw8tVmPfmPByCz02Z.s4ORdqZB74SKt19FKd6JwqnVnTXSMna',
    description: 'Contraseña de usuario para login',
  })
  @Column({
    name: 'USU_PASSWORD',
    type: 'varchar',
    length: 100,
    comment: 'Contraseña del usuario',
  })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Estado de eliminación del usuario',
    default: true,
  })
  @Column({
    name: 'USU_ESTADO',
    type: 'boolean',
    default: true,
    comment: 'Estado del usuario',
  })
  status: boolean;

  @ApiProperty({
    example: false,
    description: '¿El usuario ha validado su email?',
    default: true,
  })
  @Column({
    name: 'USU_VALIDADO',
    type: 'boolean',
    default: false,
    comment: 'Usuario validado',
  })
  isValid: boolean;

  @ApiProperty({
    example:
      'http://res.cloudinary.com/dervi5j2i/image/upload/v1716273774/hysit6g5e0h4ccmmcxim.jpg',
    description: 'Avatar de usuario',
    default: 'default.png',
    required: false,
  })
  @Column({
    name: 'USU_AVATAR',
    type: 'varchar',
    default: 'default.png',
    nullable: true,
    comment: 'Imagen del usuario',
  })
  avatar: string;

  @ApiProperty({
    example: '123456789',
    description: 'Documento de la persona/usuario que creó',
    required: false,
  })
  @Column({
    name: 'USU_USUARIO_CREO',
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: 'Documento de usuario que creó',
  })
  createDocumentUserAt?: string;

  @ApiProperty({
    example: '2024-05-25',
    description: 'Fecha de creación del registro',
    required: false,
  })
  @Column({
    name: 'USU_FECHA_CREACION',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha creación',
  })
  createDateAt?: Date;

  @ApiProperty({
    example: '123456789',
    description: 'Documento de la persona/usuario que actualizó',
    required: false,
  })
  @Column({
    name: 'USU_USUARIO_ACTUALIZACION',
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: 'Documento de usuario que actualizó',
  })
  updateDocumentUserAt?: string;

  @ApiProperty({
    example: '2024-05-25',
    description: 'Fecha de actualización del registro',
    required: false,
  })
  @Column({
    name: 'USU_FECHA_ACTUALIZACION',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha creación',
  })
  updateDateAt?: Date;

  //* ********************** *//
  //* ***** RELACIONES ***** *//
  //* ********************** *//

  @ApiProperty({
    example: {
      documentType: 'CC',
      document: '123456789',
      names: 'Juan Sebastian',
      lastNames: 'Medina Toro',
      gender: 'M',
      address: 'Carrera 46a # 121 - 43',
      phone: '3127819911',
      email: 'jsebastianmedina@correo.com',
      birthDate: '1995-05-02',
      bloodType: 'O+',
      type: 'A1',
      status: true,
      campus: {
        id: 1,
        name: 'Sede Norte A - Edificio Inteligente',
        address: 'Carrera 43A # 33C - 109',
        phone1: '6042546509',
        phone2: '6043829222',
        email1: 'sede1.atencionalcliente@sapiedu.com',
        email2: 'recursoshumanos@sapiedu.com',
        description:
          'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera.',
        status: true,
        createDocumentUserAt: '123456789',
        createDateAt: '2024-05-25',
        updateDocumentUserAt: '123456789',
        updateDateAt: '2024-05-25',
      },
      createDocumentUserAt: '123456789',
      createDateAt: '2024-05-25',
      updateDocumentUserAt: '123456789',
      updateDateAt: '2024-05-25',
    },
    description: 'Persona asociada al usuario',
  })
  @ManyToOne(() => Person, (person) => person.users, { eager: true })
  @JoinColumn({ name: 'FK_PERSONA' })
  person?: Person | number;

  @ApiProperty({
    example: [
      {
        id: 1,
        createDocumentUserAt: '123456789',
        createDateAt: '2024-05-25',
        role: {
          id: 1,
          rolName: 'BUDGETS_ROUTES',
          description: 'Rutas Presupuestales',
        },
      },
      {
        id: 2,
        createDocumentUserAt: '123456789',
        createDateAt: '2024-05-25',
        role: {
          id: 2,
          rolName: 'CAMPUS',
          description: 'Sedes',
        },
      },
      {
        id: 3,
        createDocumentUserAt: '123456789',
        createDateAt: '2024-05-25',
        role: {
          id: 7,
          rolName: 'POS_PRE_ORIGIN',
          description: 'Posiciones Presupuestales de Origen',
        },
      },
      {
        id: 4,
        createDocumentUserAt: '123456789',
        createDateAt: '2024-05-25',
        role: {
          id: 7,
          rolName: 'POS_PRE_SAPI',
          description: 'Posiciones Presupuestales de SapiEdu',
        },
      },
    ],
    description: 'Persona asociada al usuario',
  })
  @OneToMany(() => PermitAssignment, (permit) => permit.user, { eager: true })
  permit?: PermitAssignment[];

  //* ********************************************** *//
  //* ***** ANTES DE IMPACTAR LA BASE DE DATOS ***** *//
  //* ********************************************** *//
  @BeforeInsert()
  checkFildsBeforeInsert() {
    this.user = this.user.trim();
    this.password = this.password.trim();
  }

  @BeforeUpdate()
  checkFildsBeforeUpdate() {
    this.checkFildsBeforeInsert();
  }
}
