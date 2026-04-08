import type {
  AppStateReducerHittingAction,
  AppStateReducers,
} from './appState/appState.types';
import type {
  EntityDataReducerHittingAction,
  EntityDataReducers,
} from './entityData/entityData.types';

export * from './appState/appState.types';
export * from './entityData/entityData.types';

export type ReducerHittingAction =
  | AppStateReducerHittingAction
  | EntityDataReducerHittingAction;

export type ReduxState = {
  appState: AppStateReducers;
  entityData: EntityDataReducers;
};
