import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeLogEntry, NodeLogEntriesReducer } from './nodeLogEntries.types';

const nodeLogEntriesReducerMetadataInitialState: NodeLogEntriesReducer['metadata'] =
  {};

const nodeLogEntriesReducerDataInitialState: NodeLogEntriesReducer['data'] = {};

export const nodeLogEntriesInitialState = createInitialState<
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>(
  nodeLogEntriesReducerMetadataInitialState,
  nodeLogEntriesReducerDataInitialState,
);
