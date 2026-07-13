import type { StateAuthReducer } from '@js-modules/common-redux-reducer-auth-keycloak';
import type { Entity } from '@js-modules/common-redux-utils-normalized-reducers';
import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import { stateAuthReducerPath } from './stateAuth.reducer.path';

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
  // selectRequests: selectStateAuthRequests,
  // selectMetadata: selectStateAuthMetadata,
  // selectConfig: selectStateAuthConfig,
} = stateAuthSelectors;
