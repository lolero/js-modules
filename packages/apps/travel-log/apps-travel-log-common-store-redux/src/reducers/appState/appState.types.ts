import type {
  StateAuthReducer,
  StateAuthReducerHittingAction,
} from '@js-modules/common-redux-reducer-auth-keycloak';

import { StateMainReducer } from './stateMain/stateMain.types';
import { StateMainReducerHittingAction } from './stateMain/stateMain.actionsTypes';

export type AppStateReducerHittingAction =
  | StateAuthReducerHittingAction
  | StateMainReducerHittingAction;

export type AppStateReducers = {
  stateAuthReducer: StateAuthReducer;
  stateMainReducer: StateMainReducer;
};
