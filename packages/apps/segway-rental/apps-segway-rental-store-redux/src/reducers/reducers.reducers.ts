import { combineReducers } from 'redux';
import { appStateReducers } from './appState/appState.reducers';
import { entityDataReducers } from './entityData/entityData.reducers';

export const reducers = combineReducers({
  appState: appStateReducers,
  entityData: entityDataReducers,
});
