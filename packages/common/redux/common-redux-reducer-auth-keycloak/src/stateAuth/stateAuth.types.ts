import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

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
