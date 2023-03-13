import { Controller, Get } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import { UsersEntity } from '../users/users.entity';

@Controller('')
export class AppController {
  @Get('/hello-world')
  @Public()
  usersHelloWorld() {
    console.log('Hello world!');
    return 'Hello world!';
  }

  @Get('/who-am-i')
  whoAmI(
    @AuthDecoratorUsersEntityCurrent() usersEntityCurrent?: UsersEntity,
  ): UsersEntity | null {
    return usersEntityCurrent ?? null;
  }
}
