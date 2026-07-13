import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import type { ReduxState } from '../../reducers.types';
import { nodeLogEntriesReducerPath } from './nodeLogEntries.reducer.path';
import type {
  NodeLogEntriesReducer,
  NodeLogEntry,
} from './nodeLogEntries.types';

export const nodeLogEntriesSelectors = createReducerSelectors<
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  typeof nodeLogEntriesReducerPath,
  ReduxState
>(nodeLogEntriesReducerPath);

export const {
  // selectRequests: selectNodeLogEntriesRequests,
  // selectMetadata: selectNodeLogEntriesMetadata,
  // selectData: selectNodeLogEntriesData,
  // selectConfig: selectNodeLogEntriesConfig,
} = nodeLogEntriesSelectors;
