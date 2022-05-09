import { AppStateReducers } from './appState.types';

import { stateAuthInitialState } from './stateAuth/stateAuth.initialState';
import { stateDialogsInitialState } from './stateDialogs/stateDialogs.initialState';
import { stateMainInitialState } from './stateMain/stateMain.initialState';

export const appStateInitialState: AppStateReducers = {
  stateAuthReducer: stateAuthInitialState,
  stateDialogsReducer: stateDialogsInitialState,
  stateMainReducer: stateMainInitialState,
};
