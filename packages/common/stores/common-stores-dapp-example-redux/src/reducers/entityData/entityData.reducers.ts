import { combineReducers } from 'redux';

import nodeTransactionsReducer from './nodeTransactions/nodeTransactions.reducer';

export const entityDataReducers = combineReducers({
  nodeTransactionsReducer,
});
