import { Entity, Reducer, ReducerMetadata } from 'normalized-reducers-utils';

export enum SigninAction {
  signup = 'signup',
  login = 'login',
}

interface StateAuthReducerMetadata extends ReducerMetadata {
  isKeycloakReady: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

export type StateAuthReducer = Reducer<StateAuthReducerMetadata, Entity>;
