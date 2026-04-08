import type { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import type { ClassConstructor } from 'class-transformer';
import { AUTH_USERS_SERVICE } from '../constants/constants.auth';

export function utilGetAuthUsersServiceProvider<UsersServiceT>(
  usersService: ClassConstructor<UsersServiceT>,
): FactoryProvider<UsersServiceT> {
  const usersServiceProvider: FactoryProvider<UsersServiceT> = {
    provide: AUTH_USERS_SERVICE,
    useFactory: (usersServiceInstance: UsersServiceT) => usersServiceInstance,
    inject: [usersService],
  };

  return usersServiceProvider;
}
