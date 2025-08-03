import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeLogEntry, NodeLogEntriesReducer } from './nodeLogEntries.types';
import {
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
} from './nodeLogEntries.actions.creators';

const nodeLogEntriesReducerMetadataInitialState: NodeLogEntriesReducer['metadata'] =
  {
    getManyTotal: 0,
    getManyPksSorted: [],
    nodeLogEntryUnsaved: null,
  };

const nodeLogEntriesReducerDataInitialState: NodeLogEntriesReducer['data'] = {};

export const nodeLogEntriesInitialState = createInitialState<
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>(
  nodeLogEntriesReducerMetadataInitialState,
  nodeLogEntriesReducerDataInitialState,
  {
    protectedRequestIds: [
      NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
      NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
      NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
      NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
      NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
      NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
    ],
  },
);
