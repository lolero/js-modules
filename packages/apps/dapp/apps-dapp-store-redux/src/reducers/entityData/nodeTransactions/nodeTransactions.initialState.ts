import { createInitialState } from 'normalized-reducers-utils';
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
