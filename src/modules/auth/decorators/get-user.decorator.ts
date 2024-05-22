import { createParamDecorator,
    ExecutionContext,
    InternalServerErrorException } from '@nestjs/common';
import { ApiResponse } from 'src/utils/ApiResponse';
import { IUser } from '../interfaces/user.interface';

//? *** Con este decorador personalizado lo que haremos es generar la extracción de la Request          ***?//
//? *** del usuario que se encuentra logeado al sistema, el objetivo es tener un lugar centralizado     ***?//
//? *** donde tenemos la obtención del dato en cuestión                                                 ***?//

export const MyGetUserDecorator = createParamDecorator(
    ( data , ctx: ExecutionContext ): ApiResponse<IUser> => {

        //Obtengamos el usuario que estará en la request.
        const req = ctx.switchToHttp().getRequest();
        const user: ApiResponse<IUser> = req.user.data;

        if( !user ) 
            throw new InternalServerErrorException('El usuario no fue encontrado (Error on my Request).');

        return user;
    }
);
