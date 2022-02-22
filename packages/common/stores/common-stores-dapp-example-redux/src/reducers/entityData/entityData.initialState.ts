import { EntityDataReducers } from './entityData.types';

import { nodeTransactionsInitialState } from './nodeTransactions/nodeTransactions.initialState';

export const entityDataInitialState: EntityDataReducers = {
  nodeTransactionsReducer: nodeTransactionsInitialState,
};
