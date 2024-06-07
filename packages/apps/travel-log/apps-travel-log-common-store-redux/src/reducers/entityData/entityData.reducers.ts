import { combineReducers } from 'redux';

import { nodeChainsReducer } from './nodeChains/nodeChains.reducer';
import { nodeFormsReducer } from './nodeForms/nodeForms.reducer';
import { nodeLogEntriesReducer } from './nodeLogEntries/nodeLogEntries.reducer';
import { nodeTransactionsReducer } from './nodeTransactions/nodeTransactions.reducer';
import { nodeUsersReducer } from './nodeUsers/nodeUsers.reducer';

export const entityDataReducers = combineReducers({
  nodeChainsReducer,
  nodeFormsReducer,
  nodeLogEntriesReducer,
  nodeTransactionsReducer,
  nodeUsersReducer,
});
