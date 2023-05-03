import { stateAuthInitialState } from '@js-modules/common-redux-reducer-auth-keycloak';

import { AppStateReducers } from './appState.types';

import { stateMainInitialState } from './stateMain/stateMain.initialState';
import { stateSettingsInitialState } from './stateSettings/stateSettings.initialState';

export const appStateInitialState: AppStateReducers = {
  stateAuthReducer: stateAuthInitialState,
  stateMainReducer: stateMainInitialState,
  stateSettingsReducer: stateSettingsInitialState,
};
