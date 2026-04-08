import { appStateInitialState } from './appState/appState.initialState';
import { entityDataInitialState } from './entityData/entityData.initialState';
import type { ReduxState } from './reducers.types';

export const reduxInitialState: ReduxState = {
  appState: appStateInitialState,
  entityData: entityDataInitialState,
};
