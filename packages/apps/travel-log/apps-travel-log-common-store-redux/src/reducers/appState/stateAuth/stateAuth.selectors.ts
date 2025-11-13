import {
  createReducerSelectors,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateAuthReducer } from '@js-modules/common-redux-reducer-auth-keycloak';
import { stateAuthReducerPath } from './stateAuth.reducerPath';

type ReduxState = {
  appState: {
    stateAuthReducer: StateAuthReducer;
  };
};

export const stateAuthSelectors = createReducerSelectors<
  StateAuthReducer['metadata'],
  Entity,
  typeof stateAuthReducerPath,
  ReduxState
>(stateAuthReducerPath);

export const {
  selectRequests: selectStateAuthRequests,
  selectMetadata: selectStateAuthMetadata,
  selectConfig: selectStateAuthConfig,
} = stateAuthSelectors;
