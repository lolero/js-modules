import {
  CreateOneEntityRequestMetadata,
  DeleteEntitiesAction,
  DeleteOneEntityRequestMetadata,
  FailAction,
  GetOneEntityRequestMetadata,
  RequestAction,
  SavePartialReducerMetadataAction,
  SaveWholeEntitiesAction,
  UpdateOneWholeEntityRequestMetadata,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { ProductsDtoCreateOne } from '@js-modules/apps-vending-machine-api-core-modules';
import { NodeProduct, NodeProductsReducer } from './nodeProducts.types';

export enum NodeProductsActionTypes {
  NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST = 'NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS = 'NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL = 'NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
  NODE_PRODUCTS__CREATE_ONE__REQUEST = 'NODE_PRODUCTS__CREATE_ONE__REQUEST',
  NODE_PRODUCTS__CREATE_ONE__SUCCESS = 'NODE_PRODUCTS__CREATE_ONE__SUCCESS',
  NODE_PRODUCTS__CREATE_ONE__FAIL = 'NODE_PRODUCTS__CREATE_ONE__FAIL',
  NODE_PRODUCTS__GET_ONE__REQUEST = 'NODE_PRODUCTS__GET_ONE__REQUEST',
  NODE_PRODUCTS__GET_ONE__SUCCESS = 'NODE_PRODUCTS__GET_ONE__SUCCESS',
  NODE_PRODUCTS__GET_ONE__FAIL = 'NODE_PRODUCTS__GET_ONE__FAIL',
  NODE_PRODUCTS__GET_MANY__REQUEST = 'NODE_PRODUCTS__GET_MANY__REQUEST',
  NODE_PRODUCTS__GET_MANY__SUCCESS = 'NODE_PRODUCTS__GET_MANY__SUCCESS',
  NODE_PRODUCTS__GET_MANY__FAIL = 'NODE_PRODUCTS__GET_MANY__FAIL',
  NODE_PRODUCTS__UPDATE_ONE_WHOLE__REQUEST = 'NODE_PRODUCTS__UPDATE_ONE_WHOLE__REQUEST',
  NODE_PRODUCTS__UPDATE_ONE_WHOLE__SUCCESS = 'NODE_PRODUCTS__UPDATE_ONE_WHOLE__SUCCESS',
  NODE_PRODUCTS__UPDATE_ONE_WHOLE__FAIL = 'NODE_PRODUCTS__UPDATE_ONE_WHOLE__FAIL',
  NODE_PRODUCTS__DELETE_ONE__REQUEST = 'NODE_PRODUCTS__DELETE_ONE__REQUEST',
  NODE_PRODUCTS__DELETE_ONE__SUCCESS = 'NODE_PRODUCTS__DELETE_ONE__SUCCESS',
  NODE_PRODUCTS__DELETE_ONE__FAIL = 'NODE_PRODUCTS__DELETE_ONE__FAIL',
}

export type NodeProductsUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<NodeProductsReducer['metadata']>
  >;

export type NodeProductsUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    NodeProductsReducer['metadata']
  >;

export type NodeProductsUpdatePartialReducerMetadataFailAction =
  FailAction<NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL>;

export type NodeProductsCreateOneRequestAction = RequestAction<
  NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__REQUEST,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  CreateOneEntityRequestMetadata<ProductsDtoCreateOne>
>;

export type NodeProductsCreateOneSuccessAction = SaveWholeEntitiesAction<
  NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__SUCCESS,
  NodeProductsReducer['metadata'],
  NodeProduct
>;

export type NodeProductsCreateOneFailAction =
  FailAction<NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__FAIL>;

export type NodeProductsGetOneRequestAction = RequestAction<
  NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__REQUEST,
  GetOneEntityRequestMetadata
>;

export type NodeProductsGetOneSuccessAction = SaveWholeEntitiesAction<
  NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__SUCCESS,
  NodeProductsReducer['metadata'],
  NodeProduct
>;

export type NodeProductsGetOneFailAction =
  FailAction<NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__FAIL>;

export type NodeProductsGetManyRequestAction = RequestAction<
  NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__REQUEST,
  {
    sellerKeycloakId?: string;
  }
>;

export type NodeProductsGetManySuccessAction = SaveWholeEntitiesAction<
  NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__SUCCESS,
  NodeProductsReducer['metadata'],
  NodeProduct
>;

export type NodeProductsGetManyFailAction =
  FailAction<NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__FAIL>;

export type NodeProductsUpdateOneWholeRequestAction = RequestAction<
  NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__REQUEST,
  UpdateOneWholeEntityRequestMetadata<NodeProduct>
>;

export type NodeProductsUpdateOneWholeSuccessAction = SaveWholeEntitiesAction<
  NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__SUCCESS,
  NodeProductsReducer['metadata'],
  NodeProduct
>;

export type NodeProductsUpdateOneWholeFailAction =
  FailAction<NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__FAIL>;

export type NodeProductsDeleteOneRequestAction = RequestAction<
  NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__REQUEST,
  DeleteOneEntityRequestMetadata
>;

export type NodeProductsDeleteOneSuccessAction = DeleteEntitiesAction<
  NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__SUCCESS,
  NodeProductsReducer['metadata']
>;

export type NodeProductsDeleteOneFailAction =
  FailAction<NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__FAIL>;

export type NodeProductsReducerHittingAction =
  | NodeProductsUpdatePartialReducerMetadataRequestAction
  | NodeProductsUpdatePartialReducerMetadataSuccessAction
  | NodeProductsUpdatePartialReducerMetadataFailAction
  | NodeProductsCreateOneRequestAction
  | NodeProductsCreateOneSuccessAction
  | NodeProductsCreateOneFailAction
  | NodeProductsGetOneRequestAction
  | NodeProductsGetOneSuccessAction
  | NodeProductsGetOneFailAction
  | NodeProductsGetManyRequestAction
  | NodeProductsGetManySuccessAction
  | NodeProductsGetManyFailAction
  | NodeProductsUpdateOneWholeRequestAction
  | NodeProductsUpdateOneWholeSuccessAction
  | NodeProductsUpdateOneWholeFailAction
  | NodeProductsDeleteOneRequestAction
  | NodeProductsDeleteOneSuccessAction
  | NodeProductsDeleteOneFailAction;
