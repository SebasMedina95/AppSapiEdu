import {
    applyDecorators,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

//? ----------------------------------------------------------------
//? https://docs.nestjs.com/custom-decorators#decorator-composition
//? ----------------------------------------------------------------
//** El objetivo es centralziar en este decorador lo que requeriemos hacer **//
//** en los diferentes decoradores en función también del Guard creado. **//
//** Ahora solo requerimos trabajar con este decorador y asignamos los roles. **//
//** Ejemplo: @Auth("ROL1","ROL2",...). **//

export function Auth(...roles: string[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}