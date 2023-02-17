import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { USERS_SERVICE } from './auth.constants';
import type { AuthUsersEntity, AuthUsersService } from './auth.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser: AuthUsersEntity;
    }
  }
}

@Injectable()
export class AuthMiddlewareCurrentUser implements NestMiddleware {
  constructor(@Inject(USERS_SERVICE) private usersService: AuthUsersService) {}

  async use(
    req: Request<
      { currentUser?: AuthUsersEntity },
      { currentUser?: AuthUsersEntity },
      { currentUser?: AuthUsersEntity },
      { currentUser?: AuthUsersEntity },
      { currentUser?: AuthUsersEntity }
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { userId } = req.session ?? {};

    if (userId) {
      const currentUser = await this.usersService.findOne('id', userId);
      req.currentUser = currentUser;
    }

    next();
  }
}
