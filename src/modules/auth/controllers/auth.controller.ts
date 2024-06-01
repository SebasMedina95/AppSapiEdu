import { Controller,
         Post,
         Body, 
         Get,
         Param
        } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

import { CreateAuthDto } from '../dto/create/create-auth.dto';
import { RecoveryUserDto } from '../dto/recovery/recovery-user.dto';
import { RecoveryChangeUserDto } from '../dto/recovery/recovery-change-user.dto';

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
  async login(
    @Body() createAuthDto: CreateAuthDto
  ): Promise<ApiTransactionResponse<IUserAuthenticated | null>> {

    return this.authService.login(createAuthDto);

  }

  @Post('/recovery-send')
  @ApiResponse({ status: 200, description: "Email de recuperación enviado correctamente", type: UserComplementaryResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  async recoverySend(
    @Body() recoveryUserDto: RecoveryUserDto
  ): Promise<ApiTransactionResponse<IUser | null>> {

    return this.authService.recoverySend(recoveryUserDto);

  }

  @Post('/recovery-change/:token')
  @ApiQuery({ name: 'token', required: true, type: Number, description: 'Token con el usuario encriptado' })
  @ApiResponse({ status: 200, description: "Contraseña cambiada exitosamente", type: UserComplementaryResponse })
  @ApiResponse({ status: 400, description: "Problemas con los campos que se están enviando" })
  async recoveryChange(
    @Param('token') token: string,
    @Body() recoveryChangeUserDto: RecoveryChangeUserDto
  ): Promise<ApiTransactionResponse<IUser | null>> {

    return this.authService.recoveryChange(recoveryChangeUserDto, token);

  }

  // @Get('/test-private-route')
  // @Auth('AUTH')
  // testingPrivateRoute(
  //   @MyGetUserDecorator() user: IUser
  // ): Promise<ApiTransactionResponse<string | null>> {

  //   return this.authService.testingPrivateRoute();

  // }

}
