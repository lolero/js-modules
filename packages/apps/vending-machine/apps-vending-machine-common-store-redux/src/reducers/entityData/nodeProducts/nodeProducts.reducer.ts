import {
  handleDeleteEntities,
  handleFail,
  handleRequest,
  handleSavePartialReducerMetadata,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeProductsReducer } from './nodeProducts.types';
import { nodeProductsInitialState } from './nodeProducts.initialState';
import {
  NodeProductsActionTypes,
  NodeProductsReducerHittingAction,
} from './nodeProducts.actionsTypes';

export function nodeProductsReducer(
  // eslint-disable-next-line default-param-last
  state: NodeProductsReducer = nodeProductsInitialState,
  action: NodeProductsReducerHittingAction,
): NodeProductsReducer {
  switch (action.type) {
    case NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
      return handleRequest(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
      return handleFail(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__FAIL:
      return handleFail(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__GET_ONE__FAIL:
      return handleFail(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__REQUEST:
      return handleRequest(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__FAIL:
      return handleFail(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__SUCCESS:
      return handleDeleteEntities(state, action);
    case NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
