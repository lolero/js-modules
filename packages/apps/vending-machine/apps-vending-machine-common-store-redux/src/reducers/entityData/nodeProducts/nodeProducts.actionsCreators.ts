import { v4 as uuidv4 } from 'uuid';
import {
  NodeProductsActionTypes,
  NodeProductsCreateOneFailAction,
  NodeProductsCreateOneRequestAction,
  NodeProductsCreateOneSuccessAction,
  NodeProductsDeleteOneFailAction,
  NodeProductsDeleteOneRequestAction,
  NodeProductsDeleteOneSuccessAction,
  NodeProductsGetManyFailAction,
  NodeProductsGetManyRequestAction,
  NodeProductsGetManySuccessAction,
  NodeProductsGetOneFailAction,
  NodeProductsGetOneRequestAction,
  NodeProductsGetOneSuccessAction,
  NodeProductsUpdateOneWholeFailAction,
  NodeProductsUpdateOneWholeRequestAction,
  NodeProductsUpdateOneWholeSuccessAction,
  NodeProductsUpdatePartialReducerMetadataFailAction,
  NodeProductsUpdatePartialReducerMetadataRequestAction,
  NodeProductsUpdatePartialReducerMetadataSuccessAction,
} from './nodeProducts.actionsTypes';

export function createNodeProductsUpdatePartialReducerMetadataRequestAction(
  partialNodeProductsReducerMetadata: NodeProductsUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): NodeProductsUpdatePartialReducerMetadataRequestAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    requestMetadata: {
      partialReducerMetadata: partialNodeProductsReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createNodeProductsUpdatePartialReducerMetadataSuccessAction(
  partialNodeProductsReducerMetadata: NodeProductsUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: NodeProductsUpdatePartialReducerMetadataSuccessAction['requestId'],
): NodeProductsUpdatePartialReducerMetadataSuccessAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata: partialNodeProductsReducerMetadata,
    requestId,
  };
}

export function createNodeProductsUpdatePartialReducerMetadataFailAction(
  error: NodeProductsUpdatePartialReducerMetadataFailAction['error'],
  requestId: NodeProductsUpdatePartialReducerMetadataFailAction['requestId'],
): NodeProductsUpdatePartialReducerMetadataFailAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL,
    error,
    requestId,
  };
}

export function createNodeProductsCreateOneRequestAction(
  nodeProduct: NodeProductsCreateOneRequestAction['requestMetadata']['entity'],
): NodeProductsCreateOneRequestAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__REQUEST,
    requestMetadata: {
      entity: nodeProduct,
    },
    requestId: uuidv4(),
  };
}

export function createNodeProductsCreateOneSuccessAction(
  nodeProducts: NodeProductsCreateOneSuccessAction['wholeEntities'],
  requestId: NodeProductsCreateOneSuccessAction['requestId'],
  statusCode: NodeProductsCreateOneSuccessAction['statusCode'],
): NodeProductsCreateOneSuccessAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__SUCCESS,
    wholeEntities: nodeProducts,
    requestId,
    statusCode,
  };
}

export function createNodeProductsCreateOneFailAction(
  error: NodeProductsCreateOneFailAction['error'],
  requestId: NodeProductsCreateOneFailAction['requestId'],
): NodeProductsCreateOneFailAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeProductsGetOneRequestAction(
  nodeProductPk: NodeProductsGetOneRequestAction['requestMetadata']['entityPk'],
): NodeProductsGetOneRequestAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__REQUEST,
    requestMetadata: {
      entityPk: nodeProductPk,
    },
    requestId: uuidv4(),
  };
}

export function createNodeProductsGetOneSuccessAction(
  nodeProducts: NodeProductsGetOneSuccessAction['wholeEntities'],
  requestId: NodeProductsGetOneSuccessAction['requestId'],
  statusCode: NodeProductsGetOneSuccessAction['statusCode'],
): NodeProductsGetOneSuccessAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__SUCCESS,
    wholeEntities: nodeProducts,
    requestId,
    statusCode,
  };
}

export function createNodeProductsGetOneFailAction(
  error: NodeProductsGetOneFailAction['error'],
  requestId: NodeProductsGetOneFailAction['requestId'],
): NodeProductsGetOneFailAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeProductsGetManyRequestAction(
  sellerKeycloakId?: NodeProductsGetManyRequestAction['requestMetadata']['sellerKeycloakId'],
): NodeProductsGetManyRequestAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__REQUEST,
    requestMetadata: {
      sellerKeycloakId,
    },
    requestId: uuidv4(),
  };
}

export function createNodeProductsGetManySuccessAction(
  nodeProducts: NodeProductsGetManySuccessAction['wholeEntities'],
  requestId: NodeProductsGetManySuccessAction['requestId'],
  statusCode: NodeProductsGetManySuccessAction['statusCode'],
  flush: NodeProductsGetManySuccessAction['flush'],
): NodeProductsGetManySuccessAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__SUCCESS,
    wholeEntities: nodeProducts,
    requestId,
    statusCode,
    flush,
  };
}

export function createNodeProductsGetManyFailAction(
  error: NodeProductsGetManyFailAction['error'],
  requestId: NodeProductsGetManyFailAction['requestId'],
): NodeProductsGetManyFailAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__FAIL,
    error,
    requestId,
  };
}

export function createNodeProductsUpdateOneWholeRequestAction(
  nodeProductPk: NodeProductsUpdateOneWholeRequestAction['requestMetadata']['entityPk'],
  nodeProduct: NodeProductsUpdateOneWholeRequestAction['requestMetadata']['entity'],
): NodeProductsUpdateOneWholeRequestAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__REQUEST,
    requestMetadata: {
      entityPk: nodeProductPk,
      entity: nodeProduct,
    },
    requestId: uuidv4(),
  };
}

export function createNodeProductsUpdateOneWholeSuccessAction(
  nodeProducts: NodeProductsUpdateOneWholeSuccessAction['wholeEntities'],
  requestId: NodeProductsUpdateOneWholeSuccessAction['requestId'],
  statusCode: NodeProductsUpdateOneWholeSuccessAction['statusCode'],
): NodeProductsUpdateOneWholeSuccessAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__SUCCESS,
    wholeEntities: nodeProducts,
    requestId,
    statusCode,
  };
}

export function createNodeProductsUpdateOneWholeFailAction(
  error: NodeProductsUpdateOneWholeFailAction['error'],
  requestId: NodeProductsUpdateOneWholeFailAction['requestId'],
): NodeProductsUpdateOneWholeFailAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__FAIL,
    error,
    requestId,
  };
}

export function createNodeProductsDeleteOneRequestAction(
  nodeProductPk: NodeProductsDeleteOneRequestAction['requestMetadata']['entityPk'],
): NodeProductsDeleteOneRequestAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__REQUEST,
    requestMetadata: {
      entityPk: nodeProductPk,
    },
    requestId: uuidv4(),
  };
}

export function createNodeProductsDeleteOneSuccessAction(
  nodeProductPks: NodeProductsDeleteOneSuccessAction['entityPks'],
  requestId: NodeProductsDeleteOneSuccessAction['requestId'],
  statusCode: NodeProductsDeleteOneSuccessAction['statusCode'],
): NodeProductsDeleteOneSuccessAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__SUCCESS,
    entityPks: nodeProductPks,
    requestId,
    statusCode,
  };
}

export function createNodeProductsDeleteOneFailAction(
  error: NodeProductsDeleteOneFailAction['error'],
  requestId: NodeProductsDeleteOneFailAction['requestId'],
): NodeProductsDeleteOneFailAction {
  return {
    type: NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__FAIL,
    error,
    requestId,
  };
}
