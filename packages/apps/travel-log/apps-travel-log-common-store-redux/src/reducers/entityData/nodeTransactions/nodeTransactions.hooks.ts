import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { nodeTransactionsReducerSelectors } from './nodeTransactions.selectors';

export const nodeTransactionsHooks = createReducerHooks(
  nodeTransactionsReducerSelectors,
);

export const {
  useRequest: useNodeTransactionsRequest,
  useRequests: useNodeTransactionsRequests,
  useReducerMetadata: useNodeTransactionsReducerMetadata,
  useEntity: useNodeTransactionsEntity,
  useEntities: useNodeTransactionsEntities,
  useReducerConfig: useNodeTransactionsReducerConfig,
} = nodeTransactionsHooks;
