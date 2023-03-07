import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { InterceptorSerialize } from '@js-modules/apps-nest-utils';
import { AuthService } from './auth.service';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthDtoSignin } from './auth.dto.signin';
import { AuthDtoPublicUser } from './auth.dto.publicUser';
import type { AuthUsersEntity } from './auth.types';
import { AuthGuardIsUserAuthenticated } from './auth.guard.isUserAuthenticated';
import { AuthDecoratorCurrentUser } from './auth.decorator.currentUser';

@Controller('auth')
@InterceptorSerialize<AuthUsersEntity>(AuthDtoPublicUser)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/hello-world')
  usersHelloWorld() {
    console.log('Hello world!');
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
  async signout(
    @Session() session: { userId?: AuthUsersEntity['id'] },
  ): Promise<void> {
    delete session.userId;
  }
}
