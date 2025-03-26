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
} from './stateWeb3.actions.types';

export function stateWeb3Reducer(
  // eslint-disable-next-line default-param-last
  state: StateWeb3Reducer = stateWeb3InitialState,
  action: StateWeb3ReducerHittingAction,
): StateWeb3Reducer {
  switch (action.type) {
    case StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
      return handleRequest(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
      return handleFail(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__REQUEST:
      return handleRequest(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__FAIL:
      return handleFail(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__REQUEST:
      return handleRequest(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
