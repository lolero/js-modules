import type { NodeLogEntriesReducerHittingAction } from './nodeLogEntries/nodeLogEntries.actions.types';
import type { NodeLogEntriesReducer } from './nodeLogEntries/nodeLogEntries.types';
import type { NodeUsersReducerHittingAction } from './nodeUsers/nodeUsers.actions.types';
import type { NodeUsersReducer } from './nodeUsers/nodeUsers.types';

export type EntityDataReducerHittingAction =
  | NodeLogEntriesReducerHittingAction
  | NodeUsersReducerHittingAction;

export type EntityDataReducers = {
  nodeLogEntriesReducer: NodeLogEntriesReducer;
  nodeUsersReducer: NodeUsersReducer;
};
