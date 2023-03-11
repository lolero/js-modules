import {
  CreateOneEntityRequestMetadata,
  DeleteEntitiesAction,
  DeleteOneEntityRequestMetadata,
  FailAction,
  GetManyEntitiesRequestMetadata,
  RequestAction,
  SaveNothingAction,
  SaveWholeEntitiesAction,
  UpdateOneWholeEntityRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeSegway, NodeSegwaysReducer } from './nodeSegways.types';

export enum NodeSegwaysActionTypes {
  NODE_SEGWAYS_GET_MANY__REQUEST = 'NODE_SEGWAYS_GET_MANY__REQUEST',
  NODE_SEGWAYS_GET_MANY__SUCCESS = 'NODE_SEGWAYS_GET_MANY__SUCCESS',
  NODE_SEGWAYS_GET_MANY__FAIL = 'NODE_SEGWAYS_GET_MANY__FAIL',
  NODE_SEGWAYS_CREATE_ONE__REQUEST = 'NODE_SEGWAYS_CREATE_ONE__REQUEST',
  NODE_SEGWAYS_CREATE_ONE__SUCCESS = 'NODE_SEGWAYS_CREATE_ONE__SUCCESS',
  NODE_SEGWAYS_CREATE_ONE__FAIL = 'NODE_SEGWAYS_CREATE_ONE__FAIL',
  NODE_SEGWAYS_UPDATE_ONE_WHOLE__REQUEST = 'NODE_SEGWAYS_UPDATE_ONE_WHOLE__REQUEST',
  NODE_SEGWAYS_UPDATE_ONE_WHOLE__SUCCESS = 'NODE_SEGWAYS_UPDATE_ONE_WHOLE__SUCCESS',
  NODE_SEGWAYS_UPDATE_ONE_WHOLE__FAIL = 'NODE_SEGWAYS_UPDATE_ONE_WHOLE__FAIL',
  NODE_SEGWAYS_DELETE_ONE__REQUEST = 'NODE_SEGWAYS_DELETE_ONE__REQUEST',
  NODE_SEGWAYS_DELETE_ONE__SUCCESS = 'NODE_SEGWAYS_DELETE_ONE__SUCCESS',
  NODE_SEGWAYS_DELETE_ONE__FAIL = 'NODE_SEGWAYS_DELETE_ONE__FAIL',
}

export type NodeSegwaysGetManyRequestAction = RequestAction<
  NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata
>;

export type NodeSegwaysGetManySuccessAction = SaveWholeEntitiesAction<
  NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__SUCCESS,
  NodeSegwaysReducer['metadata'],
  NodeSegway
>;

export type NodeSegwaysGetManyFailAction =
  FailAction<NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__FAIL>;

export type NodeSegwaysCreateOneRequestAction = RequestAction<
  NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__REQUEST,
  CreateOneEntityRequestMetadata<NodeSegway>
>;

export type NodeSegwaysCreateOneSuccessAction =
  SaveNothingAction<NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__SUCCESS>;

export type NodeSegwaysCreateOneFailAction =
  FailAction<NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__FAIL>;

export type NodeSegwaysUpdateOneWholeRequestAction = RequestAction<
  NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__REQUEST,
  UpdateOneWholeEntityRequestMetadata<NodeSegway>
>;

export type NodeSegwaysUpdateOneWholeSuccessAction =
  SaveNothingAction<NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__SUCCESS>;

export type NodeSegwaysUpdateOneWholeFailAction =
  FailAction<NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__FAIL>;

export type NodeSegwaysDeleteOneRequestAction = RequestAction<
  NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__REQUEST,
  DeleteOneEntityRequestMetadata
>;

export type NodeSegwaysDeleteOneSuccessAction = DeleteEntitiesAction<
  NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__SUCCESS,
  NodeSegwaysReducer['metadata']
>;

export type NodeSegwaysDeleteOneFailAction =
  FailAction<NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__FAIL>;

export type NodeSegwaysReducerHittingAction =
  | NodeSegwaysGetManyRequestAction
  | NodeSegwaysGetManySuccessAction
  | NodeSegwaysGetManyFailAction
  | NodeSegwaysCreateOneRequestAction
  | NodeSegwaysCreateOneSuccessAction
  | NodeSegwaysCreateOneFailAction
  | NodeSegwaysUpdateOneWholeRequestAction
  | NodeSegwaysUpdateOneWholeSuccessAction
  | NodeSegwaysUpdateOneWholeFailAction
  | NodeSegwaysDeleteOneRequestAction
  | NodeSegwaysDeleteOneSuccessAction
  | NodeSegwaysDeleteOneFailAction;
