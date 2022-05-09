import { combineReducers } from 'redux';

import stateAuthReducer from './stateAuth/stateAuth.reducer';
import stateDialogsReducer from './stateDialogs/stateDialogs.reducer';
import stateMainReducer from './stateMain/stateMain.reducer';

export const appStateReducers = combineReducers({
  stateAuthReducer,
  stateDialogsReducer,
  stateMainReducer,
});
