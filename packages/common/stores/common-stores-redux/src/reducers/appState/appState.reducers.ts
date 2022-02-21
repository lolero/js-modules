import { combineReducers } from 'redux';

import stateMainReducer from './stateMain/stateMain.reducer';

export const appStateReducers = combineReducers({
  stateMainReducer,
});
