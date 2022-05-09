import { createReducerSelectors } from 'normalized-reducers-utils';
import { NodeUser, NodeUsersReducer } from './nodeUsers.types';
import { ReduxState } from '../../reducers.types';
import nodeUsersReducerPath from './nodeUsers.reducerPath';

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
