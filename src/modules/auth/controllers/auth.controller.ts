import { Controller,
         Post,
         Body, 
         Get
        } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

import { CreateAuthDto } from '../dto/create/create-auth.dto';
import { RecoveryUserDto } from '../dto/recovery/recovery-user.dto';

import { ApiTransactionResponse } from 'src/utils/ApiResponse';
import { IUser, IUserAuthenticated } from '../interfaces/user.interface';
import { MyGetUserDecorator } from '../decorators/get-user.decorator';
import { Auth } from '../decorators/auth-protected.decorator';

@ApiTags("Módulo de Autenticación/Autorización")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
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

  @Get('/test-private-route')
  @Auth('AUTH')
  testingPrivateRoute(
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiTransactionResponse<string | null>> {

    // console.log({ user });
    return this.authService.testingPrivateRoute();

  }

}
