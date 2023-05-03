import { combineReducers } from 'redux';

import { nodeChainsReducer } from './nodeChains/nodeChains.reducer';
import { nodeTransactionsReducer } from './nodeTransactions/nodeTransactions.reducer';
import { nodeUsersReducer } from './nodeUsers/nodeUsers.reducer';

export const entityDataReducers = combineReducers({
  nodeChainsReducer,
  nodeTransactionsReducer,
  nodeUsersReducer,
});
