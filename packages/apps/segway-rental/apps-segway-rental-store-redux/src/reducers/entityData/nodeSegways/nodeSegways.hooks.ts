import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { nodeSegwaysSelectors } from './nodeSegways.selectors';

export const nodeSegwaysHooks = createReducerHooks(nodeSegwaysSelectors);

export const {
  useRequest: useNodeSegwaysRequest,
  useRequests: useNodeSegwaysRequests,
  useReducerMetadata: useNodeSegwaysReducerMetadata,
  useEntity: useNodeSegwaysEntity,
  useEntities: useNodeSegwaysEntities,
  useReducerConfig: useNodeSegwaysReducerConfig,
} = nodeSegwaysHooks;
