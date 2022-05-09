import {
  DeleteEntitiesAction,
  DeleteOneEntityRequestMetadata,
  FailAction,
  GetManyEntitiesRequestMetadata,
  GetOneEntityRequestMetadata,
  RequestAction,
  SavePartialEntitiesAction,
  SaveWholeEntitiesAction,
} from 'normalized-reducers-utils';
import { NodeUser, NodeUsersReducer } from './nodeUsers.types';
import { UserRoles } from '../../appState/stateAuth/stateAuth.types';

export enum NodeUsersActionTypes {
  NODE_USERS_GET_MANY__REQUEST = 'NODE_USERS_GET_MANY__REQUEST',
  NODE_USERS_GET_MANY__SUCCESS = 'NODE_USERS_GET_MANY__SUCCESS',
  NODE_USERS_GET_MANY__FAIL = 'NODE_USERS_GET_MANY__FAIL',
  NODE_USERS_GET_ONE__REQUEST = 'NODE_USERS_GET_ONE__REQUEST',
  NODE_USERS_GET_ONE__SUCCESS = 'NODE_USERS_GET_ONE__SUCCESS',
  NODE_USERS_GET_ONE__FAIL = 'NODE_USERS_GET_ONE__FAIL',
  NODE_USERS_UPDATE_ONE_ROLE__REQUEST = 'NODE_USERS_UPDATE_ONE_ROLE__REQUEST',
  NODE_USERS_UPDATE_ONE_ROLE__SUCCESS = 'NODE_USERS_UPDATE_ONE_ROLE__SUCCESS',
  NODE_USERS_UPDATE_ONE_ROLE__FAIL = 'NODE_USERS_UPDATE_ONE_ROLE__FAIL',
  NODE_USERS_DELETE_ONE__REQUEST = 'NODE_USERS_DELETE_ONE__REQUEST',
  NODE_USERS_DELETE_ONE__SUCCESS = 'NODE_USERS_DELETE_ONE__SUCCESS',
  NODE_USERS_DELETE_ONE__FAIL = 'NODE_USERS_DELETE_ONE__FAIL',
}

export type NodeUsersGetManyRequestAction = RequestAction<
  NodeUsersActionTypes.NODE_USERS_GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata
>;

export type NodeUsersGetManySuccessAction = SaveWholeEntitiesAction<
  NodeUsersActionTypes.NODE_USERS_GET_MANY__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersGetManyFailAction =
  FailAction<NodeUsersActionTypes.NODE_USERS_GET_MANY__FAIL>;

export type NodeUsersGetOneRequestAction = RequestAction<
  NodeUsersActionTypes.NODE_USERS_GET_ONE__REQUEST,
  GetOneEntityRequestMetadata
>;

export type NodeUsersGetOneSuccessAction = SaveWholeEntitiesAction<
  NodeUsersActionTypes.NODE_USERS_GET_ONE__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersGetOneFailAction =
  FailAction<NodeUsersActionTypes.NODE_USERS_GET_ONE__FAIL>;

export type NodeUsersUpdateOneRoleRequestAction = RequestAction<
  NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__REQUEST,
  { nodeUserPk: string; role: UserRoles }
>;

export type NodeUsersUpdateOneRoleSuccessAction = SavePartialEntitiesAction<
  NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__SUCCESS,
  NodeUsersReducer['metadata'],
  NodeUser
>;

export type NodeUsersUpdateOneRoleFailAction =
  FailAction<NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__FAIL>;

export type NodeUsersDeleteOneRequestAction = RequestAction<
  NodeUsersActionTypes.NODE_USERS_DELETE_ONE__REQUEST,
  DeleteOneEntityRequestMetadata
>;

export type NodeUsersDeleteOneSuccessAction = DeleteEntitiesAction<
  NodeUsersActionTypes.NODE_USERS_DELETE_ONE__SUCCESS,
  NodeUsersReducer['metadata']
>;

export type NodeUsersDeleteOneFailAction =
  FailAction<NodeUsersActionTypes.NODE_USERS_DELETE_ONE__FAIL>;

export type NodeUsersReducerHittingAction =
  | NodeUsersGetManyRequestAction
  | NodeUsersGetManySuccessAction
  | NodeUsersGetManyFailAction
  | NodeUsersGetOneRequestAction
  | NodeUsersGetOneSuccessAction
  | NodeUsersGetOneFailAction
  | NodeUsersUpdateOneRoleRequestAction
  | NodeUsersUpdateOneRoleSuccessAction
  | NodeUsersUpdateOneRoleFailAction
  | NodeUsersDeleteOneRequestAction
  | NodeUsersDeleteOneSuccessAction
  | NodeUsersDeleteOneFailAction;
