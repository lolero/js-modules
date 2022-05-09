import { Application } from 'express';
import { createOne, deleteOne, getAll, getOne, updateOne } from './controller';
import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';
import { UserRoles } from '../types/usersServiceTypes';

export function routesConfig(app: Application) {
  app.get('/users', [isAuthenticated, getAll]);
  app.get('/users/:id', [
    isAuthenticated,
    isAuthorized({
      hasRole: [UserRoles.admin],
      allowSameUser: true,
    }),
    getOne,
  ]);
  app.post(
    '/users',
    isAuthenticated,
    isAuthorized({ hasRole: [UserRoles.admin] }),
    createOne,
  );
  app.patch('/users/:id', [
    isAuthenticated,
    isAuthorized({
      hasRole: [UserRoles.admin],
      allowSameUser: true,
    }),
    updateOne,
  ]);
  app.delete('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: [UserRoles.admin] }),
    deleteOne,
  ]);
}
