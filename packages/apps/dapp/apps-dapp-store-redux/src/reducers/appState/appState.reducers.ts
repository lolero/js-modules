import { combineReducers } from 'redux';

import stateMainReducer from './stateMain/stateMain.reducer';
import stateWeb3Reducer from './stateWeb3/stateWeb3.reducer';

export const appStateReducers = combineReducers({
  stateMainReducer,
  stateWeb3Reducer,
});
