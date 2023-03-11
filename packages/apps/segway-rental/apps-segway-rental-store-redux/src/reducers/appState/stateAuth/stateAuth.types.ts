import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { User } from 'firebase/auth';

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

export enum AuthMethods {
  google = 'google',
}

interface StateAuthReducerMetadata extends ReducerMetadata {
  authUser: User | null;
  authUserRole: UserRoles | null;
  authError: Error | null;
}

export type StateAuthReducer = Reducer<StateAuthReducerMetadata, Entity>;
