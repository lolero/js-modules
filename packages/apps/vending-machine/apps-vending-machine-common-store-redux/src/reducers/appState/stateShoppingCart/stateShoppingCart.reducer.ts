import {
  handleFail,
  handleRequest,
  handleSavePartialReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateShoppingCartReducer } from './stateShoppingCart.types';
import { stateShoppingCartInitialState } from './stateShoppingCart.initialState';
import {
  StateShoppingCartActionTypes,
  StateShoppingCartReducerHittingAction,
} from './stateShoppingCart.actionsTypes';

export function stateShoppingCartReducer(
  // eslint-disable-next-line default-param-last
  state: StateShoppingCartReducer = stateShoppingCartInitialState,
  action: StateShoppingCartReducerHittingAction,
): StateShoppingCartReducer {
  switch (action.type) {
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
      return handleRequest(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
      return handleFail(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__REQUEST:
      return handleRequest(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__FAIL:
      return handleFail(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__REQUEST:
      return handleRequest(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
