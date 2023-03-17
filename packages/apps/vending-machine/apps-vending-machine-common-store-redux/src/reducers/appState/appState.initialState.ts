import { stateAuthInitialState } from '@js-modules/common-redux-reducer-auth-keycloak';

import { AppStateReducers } from './appState.types';

import { stateDialogsInitialState } from './stateDialogs/stateDialogs.initialState';
import { stateMainInitialState } from './stateMain/stateMain.initialState';
import { stateShoppingCartInitialState } from './stateShoppingCart/stateShoppingCart.initialState';

export const appStateInitialState: AppStateReducers = {
  stateAuthReducer: stateAuthInitialState,
  stateDialogsReducer: stateDialogsInitialState,
  stateMainReducer: stateMainInitialState,
  stateShoppingCartReducer: stateShoppingCartInitialState,
};
