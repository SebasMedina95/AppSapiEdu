import { Controller,
         Post,
         Body, 
         Get
        } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

import { CreateAuthDto } from '../dto/create/create-auth.dto';
import { RecoveryUserDto } from '../dto/recovery/recovery-user.dto';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { IUser, IUserAuthenticated } from '../interfaces/user.interface';
import { UserComplementaryResponse } from '../doc/ResponseUser';

@ApiTags("Módulo de Autenticación/Autorización")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({ status: 200, description: "Usuario logeado correctamente", type: UserComplementaryResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  @ApiResponse({ status: 500, description: "Error en la generación del Token" })
  async login(
    @Body() createAuthDto: CreateAuthDto
  ): Promise<ApiTransactionResponse<IUserAuthenticated | null>> {

    return this.authService.login(createAuthDto);

  }

  @Post('/recovery')
  async recovery(
    @Body() recoveryUserDto: RecoveryUserDto
  ): Promise<ApiTransactionResponse<IUser | null>> {

    return this.authService.recovery(recoveryUserDto);

  }

  // @Get('/test-private-route')
  // @Auth('AUTH')
  // testingPrivateRoute(
  //   @MyGetUserDecorator() user: IUser
  // ): Promise<ApiTransactionResponse<string | null>> {

  //   return this.authService.testingPrivateRoute();

  // }

}
