import { combineReducers } from 'redux';

import { stateAuthReducer } from '@js-modules/common-redux-reducer-auth-keycloak';

import { stateDialogsReducer } from './stateDialogs/stateDialogs.reducer';
import { stateMainReducer } from './stateMain/stateMain.reducer';
import { stateShoppingCartReducer } from './stateShoppingCart/stateShoppingCart.reducer';

export const appStateReducers = combineReducers({
  stateAuthReducer,
  stateDialogsReducer,
  stateMainReducer,
  stateShoppingCartReducer,
});
