import { NodeChainsReducer } from './nodeChains/nodeChains.types';
import { NodeChainsReducerHittingAction } from './nodeChains/nodeChains.actionsTypes';
import { NodeTransactionsReducer } from './nodeTransactions/nodeTransactions.types';
import { NodeTransactionsReducerHittingAction } from './nodeTransactions/nodeTransactions.actionsTypes';
import { NodeUsersReducer } from './nodeUsers/nodeUsers.types';
import { NodeUsersReducerHittingAction } from './nodeUsers/nodeUsers.actionsTypes';

export type EntityDataReducerHittingAction =
  | NodeChainsReducerHittingAction
  | NodeTransactionsReducerHittingAction
  | NodeUsersReducerHittingAction;

export type EntityDataReducers = {
  nodeChainsReducer: NodeChainsReducer;
  nodeTransactionsReducer: NodeTransactionsReducer;
  nodeUsersReducer: NodeUsersReducer;
};
