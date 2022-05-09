import { Entity, Reducer, ReducerMetadata } from 'normalized-reducers-utils';
import { User } from 'firebase/auth';

export enum UserRoles {
  manager = 'manager',
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
