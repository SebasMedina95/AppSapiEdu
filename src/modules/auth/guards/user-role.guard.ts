import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { PermitAssignment } from "../entities/permit-assignment.entity";
import { Observable } from "rxjs";



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

        //TODO: Acá vamos
        return true;

    }

}