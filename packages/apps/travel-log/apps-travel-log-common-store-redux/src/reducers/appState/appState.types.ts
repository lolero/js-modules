import type {
  StateAuthReducer,
  StateAuthReducerHittingAction,
} from '@js-modules/common-redux-reducer-auth-keycloak';

import { StateMainReducer } from './stateMain/stateMain.types';
import { StateMainReducerHittingAction } from './stateMain/stateMain.actionsTypes';
import { StateSettingsReducer } from './stateSettings/stateSettings.types';
import { StateSettingsReducerHittingAction } from './stateSettings/stateSettings.actionsTypes';

export type AppStateReducerHittingAction =
  | StateAuthReducerHittingAction
  | StateMainReducerHittingAction
  | StateSettingsReducerHittingAction;

export type AppStateReducers = {
  stateAuthReducer: StateAuthReducer;
  stateMainReducer: StateMainReducer;
  stateSettingsReducer: StateSettingsReducer;
};
