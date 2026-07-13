import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import type { ReduxState } from '../../reducers.types';
import { nodeTransactionsReducerPath } from './nodeTransactions.reducerPath';
import type {
  NodeTransaction,
  NodeTransactionsReducer,
} from './nodeTransactions.types';

export const nodeTransactionsSelectors = createReducerSelectors<
  NodeTransactionsReducer['metadata'],
  NodeTransaction,
  typeof nodeTransactionsReducerPath,
  ReduxState
>(nodeTransactionsReducerPath);

export const {
  // selectRequests: selectNodeTransactionsRequests,
  // selectMetadata: selectNodeTransactionsMetadata,
  // selectData: selectNodeTransactionsData,
  // selectConfig: selectNodeTransactionsConfig,
} = nodeTransactionsSelectors;
