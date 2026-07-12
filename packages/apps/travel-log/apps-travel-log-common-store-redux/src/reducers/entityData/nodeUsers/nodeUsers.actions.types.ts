import type {
  FailAction,
  GetManyEntitiesRequestMetadata,
  GetOneEntityRequestMetadata,
  RequestAction,
  SavePartialEntitiesAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';
import type { NodeUser, NodeUsersReducer } from './nodeUsers.types';

export const NodeUsersActionTypes = {
  NODE_USERS__GET_ONE__REQUEST: 'NODE_USERS__GET_ONE__REQUEST',
  NODE_USERS__GET_ONE__SUCCESS: 'NODE_USERS__GET_ONE__SUCCESS',
  NODE_USERS__GET_ONE__FAIL: 'NODE_USERS__GET_ONE__FAIL',
  NODE_USERS__GET_MANY__REQUEST: 'NODE_USERS__GET_MANY__REQUEST',
  NODE_USERS__GET_MANY__SUCCESS: 'NODE_USERS__GET_MANY__SUCCESS',
  NODE_USERS__GET_MANY__FAIL: 'NODE_USERS__GET_MANY__FAIL',
  NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS:
    'NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS',
} as const;
export type NodeUsersActionTypes = Enum<typeof NodeUsersActionTypes>;

export type NodeUsersGetOneRequestAction = RequestAction<
  typeof NodeUsersActionTypes.NODE_USERS__GET_ONE__REQUEST,
  GetOneEntityRequestMetadata<NodeUser, 'id' | 'username'>
>;

export type NodeUsersGetOneSuccessAction = SaveWholeEntitiesAction<
  typeof NodeUsersActionTypes.NODE_USERS__GET_ONE__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersGetOneFailAction = FailAction<
  typeof NodeUsersActionTypes.NODE_USERS__GET_ONE__FAIL
>;

export type NodeUsersGetManyRequestAction = RequestAction<
  typeof NodeUsersActionTypes.NODE_USERS__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata<NodeUser, never>
>;

export type NodeUsersGetManySuccessAction = SaveWholeEntitiesAction<
  typeof NodeUsersActionTypes.NODE_USERS__GET_MANY__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersGetManyFailAction = FailAction<
  typeof NodeUsersActionTypes.NODE_USERS__GET_MANY__FAIL
>;

export type NodeUsersUpdateOnePartialSuccessAction = SavePartialEntitiesAction<
  typeof NodeUsersActionTypes.NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersReducerHittingAction =
  | NodeUsersGetOneRequestAction
  | NodeUsersGetOneSuccessAction
  | NodeUsersGetOneFailAction
  | NodeUsersGetManyRequestAction
  | NodeUsersGetManySuccessAction
  | NodeUsersGetManyFailAction
  | NodeUsersUpdateOnePartialSuccessAction;
