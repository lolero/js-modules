import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { KeycloakTokenParsed } from 'keycloak-js';

export enum SigninAction {
  signup = 'signup',
  login = 'login',
}

type KeycloakToken = {
  token: string;
  metadata: KeycloakTokenParsed;
};

export type KeycloakTokens = {
  id: KeycloakToken;
  access: KeycloakToken;
  refresh: KeycloakToken;
};

export interface StateAuthReducerMetadata extends ReducerMetadata {
  isKeycloakReady: boolean;
  isAuthenticated: boolean;
  tokens: KeycloakTokens | null;
}

export type StateAuthReducer = Reducer<StateAuthReducerMetadata, Entity>;
