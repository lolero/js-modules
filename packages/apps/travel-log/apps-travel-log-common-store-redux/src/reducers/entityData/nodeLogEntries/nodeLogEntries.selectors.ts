import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeLogEntry, NodeLogEntriesReducer } from './nodeLogEntries.types';
import { ReduxState } from '../../reducers.types';
import { nodeLogEntriesReducerPath } from './nodeLogEntries.reducerPath';

export const nodeLogEntriesSelectors = createReducerSelectors<
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  typeof nodeLogEntriesReducerPath,
  ReduxState
>(nodeLogEntriesReducerPath);

export const {
  selectRequests: selectNodeLogEntriesRequests,
  selectMetadata: selectNodeLogEntriesMetadata,
  selectData: selectNodeLogEntriesData,
  selectConfig: selectNodeLogEntriesConfig,
} = nodeLogEntriesSelectors;
