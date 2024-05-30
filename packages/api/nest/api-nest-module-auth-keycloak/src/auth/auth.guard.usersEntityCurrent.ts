import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AUTH_USERS_SERVICE } from '@js-modules/api-nest-utils';
// import { extractRequest } from 'nest-keycloak-connect/util';
import { AuthUsersService } from './auth.types';

export class AuthGuardUsersEntityCurrent implements CanActivate {
  constructor(
    @Inject(AUTH_USERS_SERVICE) private readonly usersService: AuthUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // TODO: Fix module resolution error with nest-keycloak-connect/util to
    //  enable AuthGuard for graphQl requests or implement an internal
    //  function which can extract the request for all protocols, e.g. rpc,
    //  websocket, graphql, etc. See https://github.com/ferrerojosh/nest-keycloak-connect/blob/master/src/util.ts
    // const [request] = extractRequest(context);
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

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
