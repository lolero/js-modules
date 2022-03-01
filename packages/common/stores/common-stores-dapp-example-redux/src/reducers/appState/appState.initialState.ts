import { AppStateReducers } from './appState.types';

import { stateMainInitialState } from './stateMain/stateMain.initialState';
import { stateWeb3InitialState } from './stateWeb3/stateWeb3.initialState';

export const appStateInitialState: AppStateReducers = {
  stateMainReducer: stateMainInitialState,
  stateWeb3Reducer: stateWeb3InitialState,
};
