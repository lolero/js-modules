import { AppStateReducers } from './appState.types';

import { stateMainInitialState } from './stateMain/stateMain.initialState';

export const appStateInitialState: AppStateReducers = {
  stateMainReducer: stateMainInitialState,
};
