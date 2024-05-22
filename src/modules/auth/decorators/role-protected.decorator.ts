import { SetMetadata } from '@nestjs/common';
import { EValidRol } from 'src/constants/ValidRoleDateEnum';

export const META_ROLES = EValidRol.roles;

//*** Los argumentos son el arreglo de roles requeridos para acceder  ***//
//*** al recurso solicitado en los controladores, no son estáticos    ***//
export const RoleProtected = (...args: string[]) => {

    return SetMetadata(META_ROLES, args);

}