import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntityType } from './auth.types';

export const CurrentAuthenticatedUser = createParamDecorator<
  never,
  ExecutionContext,
  UsersEntityType
>((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.currentUser;
});
