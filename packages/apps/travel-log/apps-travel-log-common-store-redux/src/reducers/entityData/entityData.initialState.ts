import { EntityDataReducers } from './entityData.types';

import { nodeLogEntriesInitialState } from './nodeLogEntries/nodeLogEntries.initialState';
import { nodeUsersInitialState } from './nodeUsers/nodeUsers.initialState';

export const entityDataInitialState: EntityDataReducers = {
  nodeLogEntriesReducer: nodeLogEntriesInitialState,
  nodeUsersReducer: nodeUsersInitialState,
};
