import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ClassConstructor } from 'class-transformer';
import { AUTH_USERS_SERVICE } from '../constants/constants.auth';

export function utilGetAuthUsersServiceProvider(
  usersService: ClassConstructor<any>,
): FactoryProvider {
  const usersServiceProvider: FactoryProvider = {
    provide: AUTH_USERS_SERVICE,
    useFactory: (usersServiceInstance) => usersServiceInstance,
    inject: [usersService],
  };

  return usersServiceProvider;
}
