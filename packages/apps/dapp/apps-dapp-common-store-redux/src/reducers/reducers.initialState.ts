import { ReduxState } from './reducers.types';
import { appStateInitialState } from './appState/appState.initialState';
import { entityDataInitialState } from './entityData/entityData.initialState';

export const reduxInitialState: ReduxState = {
  appState: appStateInitialState,
  entityData: entityDataInitialState,
};
