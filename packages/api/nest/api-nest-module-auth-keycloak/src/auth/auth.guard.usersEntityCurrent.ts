import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AUTH_USERS_SERVICE } from '@js-modules/api-nest-utils';
import { extractRequest } from 'nest-keycloak-connect/util';
import { AuthUsersService } from './auth.types';

export class AuthGuardUsersEntityCurrent implements CanActivate {
  constructor(
    @Inject(AUTH_USERS_SERVICE) private readonly usersService: AuthUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [request] = extractRequest(context);

    const keycloakTokenParsed = request.user;
    if (keycloakTokenParsed) {
      const usersEntityCurrent = await this.usersService.checkIn(
        keycloakTokenParsed,
      );
      request.usersEntityCurrent = usersEntityCurrent;
    }

    return true;
  }
}
