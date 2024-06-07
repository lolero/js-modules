import { combineReducers } from 'redux';

import { nodeLogEntriesReducer } from './nodeLogEntries/nodeLogEntries.reducer';
import { nodeUsersReducer } from './nodeUsers/nodeUsers.reducer';

export const entityDataReducers = combineReducers({
  nodeLogEntriesReducer,
  nodeUsersReducer,
});
