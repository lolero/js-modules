import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUsersEntity } from './auth.types';

export const AuthDecoratorCurrentUser = createParamDecorator<
  never,
  ExecutionContext,
  AuthUsersEntity
>((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.currentUser;
});
