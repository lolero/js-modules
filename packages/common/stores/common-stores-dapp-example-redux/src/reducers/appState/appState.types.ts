import { StateMainReducer } from './stateMain/stateMain.types';
import { StateMainReducerHittingAction } from './stateMain/stateMain.actionsTypes';

export type AppStateReducerHittingAction = StateMainReducerHittingAction;

export type AppStateReducers = {
  stateMainReducer: StateMainReducer;
};
