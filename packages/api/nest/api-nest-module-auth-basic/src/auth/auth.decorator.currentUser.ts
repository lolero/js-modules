import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { AuthRequest, AuthUsersEntity } from './auth.types';

export const AuthDecoratorCurrentUser = createParamDecorator<
  never,
  AuthUsersEntity | null | undefined
>((_data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<AuthRequest>();
  return request.currentUser;
});
