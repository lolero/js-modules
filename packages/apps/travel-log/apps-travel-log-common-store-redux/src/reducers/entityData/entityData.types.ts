import { NodeLogEntriesReducer } from './nodeLogEntries/nodeLogEntries.types';
import { NodeLogEntriesReducerHittingAction } from './nodeLogEntries/nodeLogEntries.actions.types';
import { NodeUsersReducer } from './nodeUsers/nodeUsers.types';
import { NodeUsersReducerHittingAction } from './nodeUsers/nodeUsers.actions.types';

export type EntityDataReducerHittingAction =
  | NodeLogEntriesReducerHittingAction
  | NodeUsersReducerHittingAction;

export type EntityDataReducers = {
  nodeLogEntriesReducer: NodeLogEntriesReducer;
  nodeUsersReducer: NodeUsersReducer;
};
