import {
  FailAction,
  GetManyEntitiesRequestMetadata,
  GetOneEntityRequestMetadata,
  RequestAction,
  SavePartialEntitiesAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeUser, NodeUsersReducer } from './nodeUsers.types';

export enum NodeUsersActionTypes {
  NODE_USERS__GET_ONE__REQUEST = 'NODE_USERS__GET_ONE__REQUEST',
  NODE_USERS__GET_ONE__SUCCESS = 'NODE_USERS__GET_ONE__SUCCESS',
  NODE_USERS__GET_ONE__FAIL = 'NODE_USERS__GET_ONE__FAIL',
  NODE_USERS__GET_MANY__REQUEST = 'NODE_USERS__GET_MANY__REQUEST',
  NODE_USERS__GET_MANY__SUCCESS = 'NODE_USERS__GET_MANY__SUCCESS',
  NODE_USERS__GET_MANY__FAIL = 'NODE_USERS__GET_MANY__FAIL',
  NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS = 'NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS',
}

export type NodeUsersGetOneRequestAction = RequestAction<
  NodeUsersActionTypes.NODE_USERS__GET_ONE__REQUEST,
  GetOneEntityRequestMetadata<NodeUser, 'id' | 'username'>
>;

export type NodeUsersGetOneSuccessAction = SaveWholeEntitiesAction<
  NodeUsersActionTypes.NODE_USERS__GET_ONE__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersGetOneFailAction =
  FailAction<NodeUsersActionTypes.NODE_USERS__GET_ONE__FAIL>;

export type NodeUsersGetManyRequestAction = RequestAction<
  NodeUsersActionTypes.NODE_USERS__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata<NodeUser, never>
>;

export type NodeUsersGetManySuccessAction = SaveWholeEntitiesAction<
  NodeUsersActionTypes.NODE_USERS__GET_MANY__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersGetManyFailAction =
  FailAction<NodeUsersActionTypes.NODE_USERS__GET_MANY__FAIL>;

export type NodeUsersUpdateOnePartialSuccessAction = SavePartialEntitiesAction<
  NodeUsersActionTypes.NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS,
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
