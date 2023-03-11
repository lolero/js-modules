import {
  handleFail,
  handleRequest,
  handleSavePartialReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateWeb3Reducer } from './stateWeb3.types';
import { stateWeb3InitialState } from './stateWeb3.initialState';
import {
  StateWeb3ActionTypes,
  StateWeb3ReducerHittingAction,
} from './stateWeb3.actionsTypes';

export function stateWeb3Reducer(
  // eslint-disable-next-line default-param-last
  state: StateWeb3Reducer = stateWeb3InitialState,
  action: StateWeb3ReducerHittingAction,
): StateWeb3Reducer {
  switch (action.type) {
    case StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST:
      return handleRequest(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_FAIL:
      return handleFail(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_REQUEST:
      return handleRequest(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_FAIL:
      return handleFail(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_WALLET_DISCONNECT_REQUEST:
      return handleRequest(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_WALLET_DISCONNECT_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateWeb3ActionTypes.STATE_WEB3_WALLET_DISCONNECT_FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
