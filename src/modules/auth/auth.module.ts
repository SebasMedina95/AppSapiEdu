import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [
    UserController,
    AuthController
  ],
  providers: [
    UserService,
    AuthService
  ],
})
export class AuthModule {}
