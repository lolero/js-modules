import type { Entity } from '@js-modules/common-redux-utils-normalized-reducers';
import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import {
  STATE_AUTH__INITIALIZE__REQUEST_ID,
  STATE_AUTH__SIGNIN__REQUEST_ID,
  STATE_AUTH__SIGNOUT__REQUEST_ID,
} from './stateAuth.actions.creators';
import type { StateAuthReducer } from './stateAuth.types';

const stateAuthReducerMetadataInitialState: StateAuthReducer['metadata'] = {
  isKeycloakReady: false,
  isAuthenticated: false,
  tokens: null,
};

const stateAuthReducerDataInitialState: StateAuthReducer['data'] = {};

export const stateAuthInitialState = createInitialState<
  typeof stateAuthReducerMetadataInitialState,
  Entity
>(stateAuthReducerMetadataInitialState, stateAuthReducerDataInitialState, {
  protectedRequestIds: [
    STATE_AUTH__INITIALIZE__REQUEST_ID,
    STATE_AUTH__SIGNIN__REQUEST_ID,
    STATE_AUTH__SIGNOUT__REQUEST_ID,
  ],
});
