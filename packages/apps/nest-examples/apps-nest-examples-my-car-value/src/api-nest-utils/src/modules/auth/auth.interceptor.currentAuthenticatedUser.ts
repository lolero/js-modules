import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { USERS_SERVICE } from './auth.constants';
import type { AuthUsersService } from './auth.types';

@Injectable()
export class AuthInterceptorCurrentAuthenticatedUser
  implements NestInterceptor
{
  constructor(@Inject(USERS_SERVICE) private usersService: AuthUsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<never>,
  ): Promise<Observable<never>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      try {
        const user = await this.usersService.findOne('id', userId);
        request.currentUser = user;
      } catch (e) {
        //
      }
    }

    return next.handle();
  }
}
