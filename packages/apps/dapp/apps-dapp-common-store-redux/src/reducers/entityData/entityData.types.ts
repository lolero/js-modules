import { NodeChainsReducer } from './nodeChains/nodeChains.types';
import { NodeChainsReducerHittingAction } from './nodeChains/nodeChains.actions.types';
import { NodeTransactionsReducer } from './nodeTransactions/nodeTransactions.types';
import { NodeTransactionsReducerHittingAction } from './nodeTransactions/nodeTransactions.actions.types';

export type EntityDataReducerHittingAction =
  | NodeChainsReducerHittingAction
  | NodeTransactionsReducerHittingAction;

export type EntityDataReducers = {
  nodeChainsReducer: NodeChainsReducer;
  nodeTransactionsReducer: NodeTransactionsReducer;
};
