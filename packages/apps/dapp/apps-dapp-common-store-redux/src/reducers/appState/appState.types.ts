import type { StateMainReducerHittingAction } from './stateMain/stateMain.actions.types';
import type { StateMainReducer } from './stateMain/stateMain.types';
import type { StateWeb3ReducerHittingAction } from './stateWeb3/stateWeb3.actions.types';
import type { StateWeb3Reducer } from './stateWeb3/stateWeb3.types';

export type AppStateReducerHittingAction =
  | StateMainReducerHittingAction
  | StateWeb3ReducerHittingAction;

export type AppStateReducers = {
  stateMainReducer: StateMainReducer;
  stateWeb3Reducer: StateWeb3Reducer;
};
