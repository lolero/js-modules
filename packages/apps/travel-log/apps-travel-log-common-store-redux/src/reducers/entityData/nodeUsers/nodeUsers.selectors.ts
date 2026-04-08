import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import type { ReduxState } from '../../reducers.types';
import { nodeUsersReducerPath } from './nodeUsers.reducer.path';
import type { NodeUser, NodeUsersReducer } from './nodeUsers.types';

export const nodeUsersSelectors = createReducerSelectors<
  NodeUsersReducer['metadata'],
  NodeUser,
  typeof nodeUsersReducerPath,
  ReduxState
>(nodeUsersReducerPath);

export const {
  selectRequests: selectNodeUsersRequests,
  selectMetadata: selectNodeUsersMetadata,
  selectData: selectNodeUsersData,
  selectConfig: selectNodeUsersConfig,
} = nodeUsersSelectors;
