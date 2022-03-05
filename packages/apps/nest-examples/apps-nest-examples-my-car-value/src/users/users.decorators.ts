import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from './users.entity';

export const CurrentUser = createParamDecorator<
  never,
  ExecutionContext,
  UsersEntity
>((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.currentUser;
});
