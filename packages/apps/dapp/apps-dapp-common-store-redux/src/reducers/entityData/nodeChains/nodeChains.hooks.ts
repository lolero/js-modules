import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { nodeChainsSelectors } from './nodeChains.selectors';

export const nodeChainsHooks = createReducerHooks(nodeChainsSelectors);

export const {
  useRequest: useNodeChainsRequest,
  useRequests: useNodeChainsRequests,
  useReducerMetadata: useNodeChainsReducerMetadata,
  useEntity: useNodeChainsEntity,
  useEntities: useNodeChainsEntities,
  useReducerConfig: useNodeChainsReducerConfig,
} = nodeChainsHooks;
