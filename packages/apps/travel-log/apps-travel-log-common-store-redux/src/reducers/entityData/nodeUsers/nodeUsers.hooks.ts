import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { nodeUsersReducerSelectors } from './nodeUsers.selectors';

export const nodeUsersHooks = createReducerHooks(nodeUsersReducerSelectors);

export const {
  useRequest: useNodeUsersRequest,
  useRequests: useNodeUsersRequests,
  useReducerMetadata: useNodeUsersReducerMetadata,
  useEntity: useNodeUsersEntity,
  useEntities: useNodeUsersEntities,
  useReducerConfig: useNodeUsersReducerConfig,
} = nodeUsersHooks;
