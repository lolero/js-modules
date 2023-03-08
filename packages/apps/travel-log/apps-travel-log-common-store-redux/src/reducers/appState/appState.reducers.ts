import { combineReducers } from 'redux';

import { stateAuthReducer } from '@js-modules/common-redux-reducer-auth-keycloak';

import { stateMainReducer } from './stateMain/stateMain.reducer';

export const appStateReducers = combineReducers({
  stateAuthReducer,
  stateMainReducer,
});
