import { StateAuthReducer } from './stateAuth/stateAuth.types';
import { StateAuthReducerHittingAction } from './stateAuth/stateAuth.actionsTypes';
import { StateDialogsReducer } from './stateDialogs/stateDialogs.types';
import { StateDialogsReducerHittingAction } from './stateDialogs/stateDialogs.actionsTypes';
import { StateMainReducer } from './stateMain/stateMain.types';
import { StateMainReducerHittingAction } from './stateMain/stateMain.actionsTypes';

export type AppStateReducerHittingAction =
  | StateAuthReducerHittingAction
  | StateDialogsReducerHittingAction
  | StateMainReducerHittingAction;

export type AppStateReducers = {
  stateAuthReducer: StateAuthReducer;
  stateDialogsReducer: StateDialogsReducer;
  stateMainReducer: StateMainReducer;
};
