import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ClassConstructor } from 'class-transformer';
import { AuthUsersService } from './auth.types';
import { USERS_SERVICE } from './auth.constants';

export function authUtilGetAuthUsersServiceProvider(
  usersService: ClassConstructor<any>,
): FactoryProvider<AuthUsersService> {
  const usersServiceProvider: FactoryProvider<AuthUsersService> = {
    provide: USERS_SERVICE,
    useFactory: (usersServiceInstance: AuthUsersService) =>
      usersServiceInstance,
    inject: [usersService],
  };

  return usersServiceProvider;
}
