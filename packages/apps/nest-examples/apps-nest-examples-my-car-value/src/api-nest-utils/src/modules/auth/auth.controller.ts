import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoUsersCreateOne } from './auth.dto.usersCreateOne';
import { AuthDtoUsersSignin } from './auth.dto.usersSignin';
import { AuthDtoUsersPublic } from './auth.dto.usersPublic';
import type { UsersEntityType } from './auth.types';
import { Serialize } from '../../interceptors/interceptor.serialize';
import { IsUserAuthenticated } from './auth.guard.isUserAuthenticated';
import { CurrentAuthenticatedUser } from './auth.decorator.currentAuthenticatedUser';

@Controller('auth')
@Serialize<UsersEntityType>(AuthDtoUsersPublic)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/whoami')
  @UseGuards(IsUserAuthenticated)
  whoAmI(
    @CurrentAuthenticatedUser() user: UsersEntityType | null,
  ): UsersEntityType | null {
    return user;
  }

  @Post('/signup')
  async signup(
    @Body() body: AuthDtoUsersCreateOne,
    @Session() session: any,
  ): Promise<UsersEntityType> {
    const user = await this.authService.signup(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async usersSignin(
    @Body() body: AuthDtoUsersSignin,
    @Session() session: any,
  ): Promise<UsersEntityType> {
    const user = await this.authService.signin(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Get('/signout')
  async usersSignout(@Session() session: any): Promise<void> {
    delete session.userId;
  }
}
