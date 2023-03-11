import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import {
  NodeTransaction,
  NodeTransactionsReducer,
} from './nodeTransactions.types';

const nodeTransactionsReducerMetadataInitialState: NodeTransactionsReducer['metadata'] =
  {};

const nodeTransactionsReducerDataInitialState: NodeTransactionsReducer['data'] =
  {};

export const nodeTransactionsInitialState = createInitialState<
  NodeTransactionsReducer['metadata'],
  NodeTransaction
>(
  nodeTransactionsReducerMetadataInitialState,
  nodeTransactionsReducerDataInitialState,
);
