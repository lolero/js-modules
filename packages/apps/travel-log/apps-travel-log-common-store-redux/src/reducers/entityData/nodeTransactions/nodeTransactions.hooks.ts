import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { nodeTransactionsSelectors } from './nodeTransactions.selectors';

export const nodeTransactionsHooks = createReducerHooks(
  nodeTransactionsSelectors,
);

export const {
  useRequest: useNodeTransactionsRequest,
  useRequests: useNodeTransactionsRequests,
  useReducerMetadata: useNodeTransactionsReducerMetadata,
  useEntity: useNodeTransactionsEntity,
  useEntities: useNodeTransactionsEntities,
  useReducerConfig: useNodeTransactionsReducerConfig,
} = nodeTransactionsHooks;
