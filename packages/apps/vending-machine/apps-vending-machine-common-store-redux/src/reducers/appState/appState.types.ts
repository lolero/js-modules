import type {
  StateAuthReducer,
  StateAuthReducerHittingAction,
} from '@js-modules/common-redux-reducer-auth-keycloak';

import { StateDialogsReducer } from './stateDialogs/stateDialogs.types';
import { StateDialogsReducerHittingAction } from './stateDialogs/stateDialogs.actionsTypes';
import { StateMainReducer } from './stateMain/stateMain.types';
import { StateMainReducerHittingAction } from './stateMain/stateMain.actionsTypes';
import { StateShoppingCartReducer } from './stateShoppingCart/stateShoppingCart.types';
import { StateShoppingCartReducerHittingAction } from './stateShoppingCart/stateShoppingCart.actionsTypes';

export type AppStateReducerHittingAction =
  | StateAuthReducerHittingAction
  | StateDialogsReducerHittingAction
  | StateMainReducerHittingAction
  | StateShoppingCartReducerHittingAction;

export type AppStateReducers = {
  stateAuthReducer: StateAuthReducer;
  stateDialogsReducer: StateDialogsReducer;
  stateMainReducer: StateMainReducer;
  stateShoppingCartReducer: StateShoppingCartReducer;
};
