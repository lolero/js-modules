import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
// import { extractRequest } from 'nest-keycloak-connect/util';
import type { AuthRequest } from './auth.types';

export const AuthDecoratorUsersEntityCurrent = createParamDecorator(
  (_data, context: ExecutionContext) => {
    // TODO: Fix module resolution error with nest-keycloak-connect/util to
    //  enable AuthGuard for graphQl requests or implement an internal
    //  function which can extract the request for all protocols, e.g. rpc,
    //  websocket, graphql, etc. See https://github.com/ferrerojosh/nest-keycloak-connect/blob/master/src/util.ts
    // const [request] = extractRequest(context);
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<AuthRequest>();
    return request.usersEntityCurrent;
  },
);
