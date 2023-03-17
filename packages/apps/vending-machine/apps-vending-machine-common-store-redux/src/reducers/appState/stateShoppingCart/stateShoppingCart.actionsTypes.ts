import {
  FailAction,
  RequestAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateShoppingCartReducer } from './stateShoppingCart.types';

export enum StateShoppingCartActionTypes {
  STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST = 'STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS = 'STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__FAIL = 'STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
  STATE_SHOPPING_CART__ADD_ITEM__REQUEST = 'STATE_SHOPPING_CART__ADD_ITEM__REQUEST',
  STATE_SHOPPING_CART__ADD_ITEM__SUCCESS = 'STATE_SHOPPING_CART__ADD_ITEM__SUCCESS',
  STATE_SHOPPING_CART__ADD_ITEM__FAIL = 'STATE_SHOPPING_CART__ADD_ITEM__FAIL',
  STATE_SHOPPING_CART__REMOVE_ITEM__REQUEST = 'STATE_SHOPPING_CART__REMOVE_ITEM__REQUEST',
  STATE_SHOPPING_CART__REMOVE_ITEM__SUCCESS = 'STATE_SHOPPING_CART__REMOVE_ITEM__SUCCESS',
  STATE_SHOPPING_CART__REMOVE_ITEM__FAIL = 'STATE_SHOPPING_CART__REMOVE_ITEM__FAIL',
}

export type StateShoppingCartUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<
      StateShoppingCartReducer['metadata']
    >
  >;

export type StateShoppingCartUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateShoppingCartReducer['metadata']
  >;

export type StateShoppingCartUpdatePartialReducerMetadataFailAction =
  FailAction<StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__FAIL>;

export type StateShoppingCartAddItemRequestAction = RequestAction<
  StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__REQUEST,
  {
    nodeProductPk: string;
  }
>;

export type StateShoppingCartAddItemSuccessAction =
  SavePartialReducerMetadataAction<
    StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__SUCCESS,
    StateShoppingCartReducer['metadata']
  >;

export type StateShoppingCartAddItemFailAction =
  FailAction<StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__FAIL>;

export type StateShoppingCartRemoveItemRequestAction = RequestAction<
  StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__REQUEST,
  {
    nodeProductPk: string;
  }
>;

export type StateShoppingCartRemoveItemSuccessAction =
  SavePartialReducerMetadataAction<
    StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__SUCCESS,
    StateShoppingCartReducer['metadata']
  >;

export type StateShoppingCartRemoveItemFailAction =
  FailAction<StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__FAIL>;

export type StateShoppingCartReducerHittingAction =
  | StateShoppingCartUpdatePartialReducerMetadataRequestAction
  | StateShoppingCartUpdatePartialReducerMetadataSuccessAction
  | StateShoppingCartUpdatePartialReducerMetadataFailAction
  | StateShoppingCartAddItemRequestAction
  | StateShoppingCartAddItemSuccessAction
  | StateShoppingCartAddItemFailAction
  | StateShoppingCartRemoveItemRequestAction
  | StateShoppingCartRemoveItemSuccessAction
  | StateShoppingCartRemoveItemFailAction;
