import { v4 as uuidv4 } from 'uuid';
import {
  StateShoppingCartActionTypes,
  StateShoppingCartAddItemFailAction,
  StateShoppingCartAddItemRequestAction,
  StateShoppingCartAddItemSuccessAction,
  StateShoppingCartRemoveItemFailAction,
  StateShoppingCartRemoveItemRequestAction,
  StateShoppingCartRemoveItemSuccessAction,
  StateShoppingCartUpdatePartialReducerMetadataFailAction,
  StateShoppingCartUpdatePartialReducerMetadataRequestAction,
  StateShoppingCartUpdatePartialReducerMetadataSuccessAction,
} from './stateShoppingCart.actionsTypes';

export function createStateShoppingCartUpdatePartialReducerMetadataRequestAction(
  partialStateShoppingCartReducerMetadata: StateShoppingCartUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): StateShoppingCartUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    requestMetadata: {
      partialReducerMetadata: partialStateShoppingCartReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateShoppingCartUpdatePartialReducerMetadataSuccessAction(
  partialStateShoppingCartReducerMetadata: StateShoppingCartUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateShoppingCartUpdatePartialReducerMetadataSuccessAction['requestId'],
): StateShoppingCartUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata: partialStateShoppingCartReducerMetadata,
    requestId,
  };
}

export function createStateShoppingCartUpdatePartialReducerMetadataFailAction(
  error: StateShoppingCartUpdatePartialReducerMetadataFailAction['error'],
  requestId: StateShoppingCartUpdatePartialReducerMetadataFailAction['requestId'],
): StateShoppingCartUpdatePartialReducerMetadataFailAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__FAIL,
    error,
    requestId,
  };
}

export function createStateShoppingCartAddItemRequestAction(
  nodeProductPk: StateShoppingCartAddItemRequestAction['requestMetadata']['nodeProductPk'],
): StateShoppingCartAddItemRequestAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__REQUEST,
    requestMetadata: {
      nodeProductPk,
    },
    requestId: uuidv4(),
  };
}

export function createStateShoppingCartAddItemSuccessAction(
  partialStateShoppingCartReducerMetadata: StateShoppingCartAddItemSuccessAction['partialReducerMetadata'],
  requestId: StateShoppingCartAddItemSuccessAction['requestId'],
): StateShoppingCartAddItemSuccessAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__SUCCESS,
    partialReducerMetadata: partialStateShoppingCartReducerMetadata,
    requestId,
  };
}

export function createStateShoppingCartAddItemFailAction(
  error: StateShoppingCartAddItemFailAction['error'],
  requestId: StateShoppingCartAddItemFailAction['requestId'],
): StateShoppingCartAddItemFailAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__FAIL,
    error,
    requestId,
  };
}

export function createStateShoppingCartRemoveItemRequestAction(
  nodeProductPk: StateShoppingCartRemoveItemRequestAction['requestMetadata']['nodeProductPk'],
): StateShoppingCartRemoveItemRequestAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__REQUEST,
    requestMetadata: {
      nodeProductPk,
    },
    requestId: uuidv4(),
  };
}

export function createStateShoppingCartRemoveItemSuccessAction(
  partialStateShoppingCartReducerMetadata: StateShoppingCartRemoveItemSuccessAction['partialReducerMetadata'],
  requestId: StateShoppingCartRemoveItemSuccessAction['requestId'],
): StateShoppingCartRemoveItemSuccessAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__SUCCESS,
    partialReducerMetadata: partialStateShoppingCartReducerMetadata,
    requestId,
  };
}

export function createStateShoppingCartRemoveItemFailAction(
  error: StateShoppingCartRemoveItemFailAction['error'],
  requestId: StateShoppingCartRemoveItemFailAction['requestId'],
): StateShoppingCartRemoveItemFailAction {
  return {
    type: StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__FAIL,
    error,
    requestId,
  };
}
