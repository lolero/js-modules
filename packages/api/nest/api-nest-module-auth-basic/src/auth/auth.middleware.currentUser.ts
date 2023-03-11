import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AUTH_USERS_SERVICE } from './auth.constants';
import type { AuthUsersEntity, AuthUsersService } from './auth.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser: AuthUsersEntity | null;
    }
  }
}

@Injectable()
export class AuthMiddlewareCurrentUser implements NestMiddleware {
  constructor(
    @Inject(AUTH_USERS_SERVICE) private usersService: AuthUsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.session ?? {};

    if (userId) {
      const currentUser = await this.usersService.findOne('id', userId);
      req.currentUser = currentUser;
    }

    next();
  }
}
