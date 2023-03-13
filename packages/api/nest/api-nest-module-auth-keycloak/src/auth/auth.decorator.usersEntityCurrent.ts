import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { extractRequest } from 'nest-keycloak-connect/util';

export const AuthDecoratorUsersEntityCurrent = createParamDecorator<
  never,
  ExecutionContext,
  any
>((data, context: ExecutionContext) => {
  const [request] = extractRequest(context);
  return request.usersEntityCurrent;
});
