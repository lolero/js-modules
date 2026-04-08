import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { InterceptorSerialize } from '@js-modules/api-nest-utils';
import { AuthDecoratorCurrentUser } from './auth.decorator.currentUser';
import { AuthDtoPublicUser } from './auth.dto.publicUser';
import { AuthDtoSignin } from './auth.dto.signin';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthGuardIsUserAuthenticated } from './auth.guard.isUserAuthenticated';
import { AuthService } from './auth.service';
import type { AuthUsersEntity } from './auth.types';

@Controller('auth')
@InterceptorSerialize<AuthUsersEntity>(AuthDtoPublicUser)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/hello-world')
  usersHelloWorld() {
    return 'Hello world!';
  }

  @Get('/whoami')
  @UseGuards(AuthGuardIsUserAuthenticated)
  whoAmI(
    @AuthDecoratorCurrentUser() currentUser: AuthUsersEntity | null,
  ): AuthUsersEntity | null {
    return currentUser;
  }

  @Post('/signup')
  async signup(
    @Body() authDtoSignup: AuthDtoSignup,
    @Session() session: { userId?: AuthUsersEntity['id'] },
  ): Promise<AuthUsersEntity> {
    const user = await this.authService.signup(authDtoSignup);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(
    @Body() authDtoSignin: AuthDtoSignin,
    @Session() session: { userId?: AuthUsersEntity['id'] },
  ): Promise<AuthUsersEntity> {
    const user = await this.authService.signin(authDtoSignin);

    session.userId = user.id;

    return user;
  }

  @Get('/signout')
  signout(@Session() session: { userId?: AuthUsersEntity['id'] }): void {
    delete session.userId;
  }
}
