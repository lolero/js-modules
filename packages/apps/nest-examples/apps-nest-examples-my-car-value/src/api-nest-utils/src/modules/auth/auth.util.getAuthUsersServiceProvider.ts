import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ClassConstructor } from 'class-transformer';
import { UsersServiceType } from './auth.types';
import { USERS_SERVICE } from './auth.constants';

export function getAuthUsersServiceProvider(
  usersService: ClassConstructor<any>,
): FactoryProvider<UsersServiceType> {
  const usersServiceProvider: FactoryProvider<UsersServiceType> = {
    provide: USERS_SERVICE,
    useFactory: (usersServiceInstance: UsersServiceType) =>
      usersServiceInstance,
    inject: [usersService],
  };

  return usersServiceProvider;
}
