import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthDtoSignin } from './auth.dto.signin';
import { AuthDtoPublicUser } from './auth.dto.publicUser';
import type { AuthUsersEntity } from './auth.types';
import { Serialize } from '../../interceptors/interceptor.serialize';
import { IsUserAuthenticated } from './auth.guard.isUserAuthenticated';
import { CurrentAuthenticatedUser } from './auth.decorator.currentAuthenticatedUser';

@Controller('auth')
@Serialize<AuthUsersEntity>(AuthDtoPublicUser)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/whoami')
  @UseGuards(IsUserAuthenticated)
  whoAmI(
    @CurrentAuthenticatedUser() user: AuthUsersEntity | null,
  ): AuthUsersEntity | null {
    return user;
  }

  @Post('/signup')
  async authSignup(
    @Body() body: AuthDtoSignup,
    @Session() session: { userId?: AuthUsersEntity['id'] },
  ): Promise<AuthUsersEntity> {
    const user = await this.authService.signup(body);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async authSignin(
    @Body() body: AuthDtoSignin,
    @Session() session: { userId?: AuthUsersEntity['id'] },
  ): Promise<AuthUsersEntity> {
    const user = await this.authService.signin(
      body.uniqueKeyName,
      body.uniqueKeyValue,
      body.password,
    );

    session.userId = user.id;

    return user;
  }

  @Get('/signout')
  async authSignout(
    @Session() session: { userId?: AuthUsersEntity['id'] },
  ): Promise<void> {
    delete session.userId;
  }
}
