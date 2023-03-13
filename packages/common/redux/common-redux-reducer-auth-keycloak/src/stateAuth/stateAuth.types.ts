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
  bearer: KeycloakToken;
  id: KeycloakToken;
  refresh: KeycloakToken;
};

interface StateAuthReducerMetadata extends ReducerMetadata {
  isKeycloakReady: boolean;
  isAuthenticated: boolean;
  tokens: KeycloakTokens | null;
}

export type StateAuthReducer = Reducer<StateAuthReducerMetadata, Entity>;
