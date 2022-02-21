import { NodeTransactionsReducer } from './nodeTransactions/nodeTransactions.types';
import { NodeTransactionsReducerHittingAction } from './nodeTransactions/nodeTransactions.actionsTypes';

export type EntityDataReducerHittingAction =
  NodeTransactionsReducerHittingAction;

export type EntityDataReducers = {
  nodeTransactionsReducer: NodeTransactionsReducer;
};
