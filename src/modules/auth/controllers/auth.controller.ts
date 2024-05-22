import { Controller,
         Post,
         Body, 
         Get,
         UseGuards,
         SetMetadata} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create/create-auth.dto';
import { RecoveryUserDto } from '../dto/recovery/recovery-user.dto';
import { ApiResponse } from 'src/utils/ApiResponse';
import { IUser, IUserAuthenticated } from '../interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { MyGetUserDecorator } from '../decorators/get-user.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Auth } from '../decorators/auth-protected.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() createAuthDto: CreateAuthDto
  ): Promise<ApiResponse<IUserAuthenticated | null>> {

    return this.authService.login(createAuthDto);

  }

  @Post('/recovery')
  async recovery(
    @Body() recoveryUserDto: RecoveryUserDto
  ): Promise<ApiResponse<IUser | null>> {

    return this.authService.recovery(recoveryUserDto);

  }

  @Get('/test-private-route')
  @Auth('EMPANADA','PASTEL DE POLLO')
  testingPrivateRoute(
    @MyGetUserDecorator() user: IUser
  ): Promise<ApiResponse<string | null>> {

    // console.log({ user });
    return this.authService.testingPrivateRoute();

  }

}
