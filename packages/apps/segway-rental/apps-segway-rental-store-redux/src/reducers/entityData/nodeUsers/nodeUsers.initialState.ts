import { createInitialState } from 'normalized-reducers-utils';
import { NodeUser, NodeUsersReducer } from './nodeUsers.types';

const nodeUsersReducerMetadataInitialState: NodeUsersReducer['metadata'] = {};

const nodeUsersReducerDataInitialState: NodeUsersReducer['data'] = {};

export const nodeUsersInitialState = createInitialState<
  NodeUsersReducer['metadata'],
  NodeUser
>(nodeUsersReducerMetadataInitialState, nodeUsersReducerDataInitialState);
