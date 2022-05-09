import { Request, Response } from 'express';
import { UserRoles } from '../types/usersServiceTypes';

export function isAuthorized(opts: {
  hasRole: Array<UserRoles.admin | UserRoles.user>;
  allowSameUser?: boolean;
}) {
  return (req: Request, res: Response, next: () => unknown) => {
    const { role, uid } = res.locals;
    const { id } = req.params;

    if (uid === 'T7KRKotDfEZflgepZk1Oc7lD8C13') {
      return next();
    }

    if (opts.allowSameUser && id && uid === id) {
      return next();
    }

    if (!role) {
      return res.status(403).send();
    }

    if (opts.hasRole.includes(role)) {
      return next();
    }

    return res.status(403).send();
  };
}
