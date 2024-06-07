import { NodeChainsReducer } from './nodeChains/nodeChains.types';
import { NodeChainsReducerHittingAction } from './nodeChains/nodeChains.actionsTypes';
import { NodeFormsReducer } from './nodeForms/nodeForms.types';
import { NodeFormsReducerHittingAction } from './nodeForms/nodeForms.actionsTypes';
import { NodeLogEntriesReducer } from './nodeLogEntries/nodeLogEntries.types';
import { NodeLogEntriesReducerHittingAction } from './nodeLogEntries/nodeLogEntries.actionsTypes';
import { NodeTransactionsReducer } from './nodeTransactions/nodeTransactions.types';
import { NodeTransactionsReducerHittingAction } from './nodeTransactions/nodeTransactions.actionsTypes';
import { NodeUsersReducer } from './nodeUsers/nodeUsers.types';
import { NodeUsersReducerHittingAction } from './nodeUsers/nodeUsers.actionsTypes';

export type EntityDataReducerHittingAction =
  | NodeChainsReducerHittingAction
  | NodeFormsReducerHittingAction
  | NodeLogEntriesReducerHittingAction
  | NodeTransactionsReducerHittingAction
  | NodeUsersReducerHittingAction;

export type EntityDataReducers = {
  nodeChainsReducer: NodeChainsReducer;
  nodeFormsReducer: NodeFormsReducer;
  nodeLogEntriesReducer: NodeLogEntriesReducer;
  nodeTransactionsReducer: NodeTransactionsReducer;
  nodeUsersReducer: NodeUsersReducer;
};
