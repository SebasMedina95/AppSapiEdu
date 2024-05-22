import { CanActivate,
         ExecutionContext,
         ForbiddenException,
         Injectable,
         UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable } from "rxjs";

import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { PermitAssignment } from "../entities/permit-assignment.entity";

import { META_ROLES } from "../decorators/role-protected.decorator";
import { IUser } from "../interfaces/user.interface";
import { IRole } from "../interfaces/role.interface";

@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(PermitAssignment) private readonly permitRepository: Repository<PermitAssignment>,
        private readonly reflector: Reflector
    ){}

    canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {

        //** Capturemos los roles requeridos para el acceso (El que definimos en la ruta del controlador) **//
        const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

        //* Si vamos a usar la validación, requerimos que tenga roles para la verificación **//
        if( !validRoles || validRoles.length === 0 )
            throw new UnauthorizedException(`No se asignaron roles para la validación de seguridad`);

        //** Recapturemos el usuario del acceso y también **//
        //** validemos nuevamente que el usuario si exista en la Request **//
        const req = context.switchToHttp().getRequest();
        const user = req.user.data as IUser;

        if( !user || user == null || user == undefined )
            throw new UnauthorizedException(`El usuario no pudo ser obtenido para la verificación`);

        //** Obtengamos los permisos que tiene asignado actualmente el usuario y   ** *//
        //** realicemos las conversiones para comparar con los permisos requeridos ** *//
        let rolesOfUser: string[] = [];
        for (const iterRoles of user.permit) {

            const getRol: IRole = iterRoles.role as IRole
            const getRolName: string = getRol.rolName;
            rolesOfUser.push(getRolName);
      
        }

        // console.log({ validRoles })
        // console.log({ rolesOfUser })

        //*****  Verifico si todos los permisos validos los tengo en los permisos que tiene        ****//
        //*****  asignado el usuario actualmente, con uno que no, marcaríamos que falta, esto nos  ****//
        //*****  nos funcionará cuando son roles combinados según la funcionalidad requeirda       ****//
        const allFound = validRoles.every( element => rolesOfUser.includes(element) );
        if(allFound) return true;

        throw new ForbiddenException(`El usuario ${user.user} no tiene los permisos requeridos para acceder a esta funcionalidad. Solo se permiten con roles: [${validRoles}] y el usuario actual tiene el/los roles: [${rolesOfUser}]`);

    }

}