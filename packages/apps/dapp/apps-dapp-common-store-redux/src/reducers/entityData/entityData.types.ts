import type { NodeChainsReducerHittingAction } from './nodeChains/nodeChains.actions.types';
import type { NodeChainsReducer } from './nodeChains/nodeChains.types';
import type { NodeTransactionsReducerHittingAction } from './nodeTransactions/nodeTransactions.actions.types';
import type { NodeTransactionsReducer } from './nodeTransactions/nodeTransactions.types';

export type EntityDataReducerHittingAction =
  | NodeChainsReducerHittingAction
  | NodeTransactionsReducerHittingAction;

export type EntityDataReducers = {
  nodeChainsReducer: NodeChainsReducer;
  nodeTransactionsReducer: NodeTransactionsReducer;
};
