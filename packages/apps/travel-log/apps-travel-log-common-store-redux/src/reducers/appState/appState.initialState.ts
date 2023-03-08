import { stateAuthInitialState } from '@js-modules/common-redux-reducer-auth-keycloak';

import { AppStateReducers } from './appState.types';

import { stateMainInitialState } from './stateMain/stateMain.initialState';

export const appStateInitialState: AppStateReducers = {
  stateAuthReducer: stateAuthInitialState,
  stateMainReducer: stateMainInitialState,
};
