import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AUTH_USERS_SERVICE } from '@js-modules/api-nest-utils';
import type { AuthRequest, AuthUsersService } from './auth.types';

@Injectable()
export class AuthInterceptorCurrentUser implements NestInterceptor {
  constructor(
    @Inject(AUTH_USERS_SERVICE)
    private readonly authUsersService: AuthUsersService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<never>,
  ): Promise<Observable<never>> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.authUsersService.findOne('id', userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}
