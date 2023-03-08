import { combineReducers } from 'redux';

import nodeChainsReducer from './nodeChains/nodeChains.reducer';
import nodeTransactionsReducer from './nodeTransactions/nodeTransactions.reducer';

export const entityDataReducers = combineReducers({
  nodeChainsReducer,
  nodeTransactionsReducer,
});
