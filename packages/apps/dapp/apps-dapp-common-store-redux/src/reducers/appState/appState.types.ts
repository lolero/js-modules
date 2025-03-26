import { StateMainReducer } from './stateMain/stateMain.types';
import { StateMainReducerHittingAction } from './stateMain/stateMain.actions.types';
import { StateWeb3Reducer } from './stateWeb3/stateWeb3.types';
import { StateWeb3ReducerHittingAction } from './stateWeb3/stateWeb3.actions.types';

export type AppStateReducerHittingAction =
  | StateMainReducerHittingAction
  | StateWeb3ReducerHittingAction;

export type AppStateReducers = {
  stateMainReducer: StateMainReducer;
  stateWeb3Reducer: StateWeb3Reducer;
};
