import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { nodeChainsReducerSelectors } from './nodeChains.selectors';

export const nodeChainsHooks = createReducerHooks(nodeChainsReducerSelectors);

export const {
  useRequest: useNodeChainsRequest,
  useRequests: useNodeChainsRequests,
  useReducerMetadata: useNodeChainsReducerMetadata,
  useEntity: useNodeChainsEntity,
  useEntities: useNodeChainsEntities,
  useReducerConfig: useNodeChainsReducerConfig,
} = nodeChainsHooks;
