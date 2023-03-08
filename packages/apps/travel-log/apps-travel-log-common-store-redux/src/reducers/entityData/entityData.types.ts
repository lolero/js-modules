import { NodeChainsReducer } from './nodeChains/nodeChains.types';
import { NodeChainsReducerHittingAction } from './nodeChains/nodeChains.actionsTypes';
import { NodeTransactionsReducer } from './nodeTransactions/nodeTransactions.types';
import { NodeTransactionsReducerHittingAction } from './nodeTransactions/nodeTransactions.actionsTypes';

export type EntityDataReducerHittingAction =
  | NodeChainsReducerHittingAction
  | NodeTransactionsReducerHittingAction;

export type EntityDataReducers = {
  nodeChainsReducer: NodeChainsReducer;
  nodeTransactionsReducer: NodeTransactionsReducer;
};
