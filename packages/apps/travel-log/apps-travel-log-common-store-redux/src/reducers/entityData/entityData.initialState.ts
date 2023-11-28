import { EntityDataReducers } from './entityData.types';

import { nodeChainsInitialState } from './nodeChains/nodeChains.initialState';
import { nodeFormsInitialState } from './nodeForms/nodeForms.initialState';
import { nodeTransactionsInitialState } from './nodeTransactions/nodeTransactions.initialState';
import { nodeUsersInitialState } from './nodeUsers/nodeUsers.initialState';

export const entityDataInitialState: EntityDataReducers = {
  nodeChainsReducer: nodeChainsInitialState,
  nodeFormsReducer: nodeFormsInitialState,
  nodeTransactionsReducer: nodeTransactionsInitialState,
  nodeUsersReducer: nodeUsersInitialState,
};
