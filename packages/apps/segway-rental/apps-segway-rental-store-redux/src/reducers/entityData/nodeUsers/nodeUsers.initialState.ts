import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeUser, NodeUsersReducer } from './nodeUsers.types';

const nodeUsersReducerMetadataInitialState: NodeUsersReducer['metadata'] = {};

const nodeUsersReducerDataInitialState: NodeUsersReducer['data'] = {};

export const nodeUsersInitialState = createInitialState<
  NodeUsersReducer['metadata'],
  NodeUser
>(nodeUsersReducerMetadataInitialState, nodeUsersReducerDataInitialState);
