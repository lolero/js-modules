import type {
  StateAuthReducer,
  StateAuthReducerHittingAction,
} from '@js-modules/common-redux-reducer-auth-keycloak';
import type { StateMainReducerHittingAction } from './stateMain/stateMain.actions.types';
import type { StateMainReducer } from './stateMain/stateMain.types';
import type { StateSettingsReducerHittingAction } from './stateSettings/stateSettings.actions.types';
import type { StateSettingsReducer } from './stateSettings/stateSettings.types';

export type AppStateReducerHittingAction =
  | StateAuthReducerHittingAction
  | StateMainReducerHittingAction
  | StateSettingsReducerHittingAction;

export type AppStateReducers = {
  stateAuthReducer: StateAuthReducer;
  stateMainReducer: StateMainReducer;
  stateSettingsReducer: StateSettingsReducer;
};
