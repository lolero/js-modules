import {
  FailAction,
  GetManyEntitiesRequestMetadata,
  RequestAction,
  SavePartialEntitiesAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { EntityUniqueKeyValue } from '@js-modules/api-nest-utils';
import { UsersUniqueKeyName } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/users.types';
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
  {
    uniqueKeyValue: EntityUniqueKeyValue;
    uniqueKeyName: UsersUniqueKeyName;
  }
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
  GetManyEntitiesRequestMetadata
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
