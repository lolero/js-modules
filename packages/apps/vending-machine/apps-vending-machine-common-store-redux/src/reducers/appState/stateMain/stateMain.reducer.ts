import {
  handleFail,
  handleRequest,
  handleSavePartialReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateMainReducer } from './stateMain.types';
import { stateMainInitialState } from './stateMain.initialState';
import {
  StateMainActionTypes,
  StateMainReducerHittingAction,
} from './stateMain.actionsTypes';

export function stateMainReducer(
  // eslint-disable-next-line default-param-last
  state: StateMainReducer = stateMainInitialState,
  action: StateMainReducerHittingAction,
): StateMainReducer {
  switch (action.type) {
    case StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
      return handleRequest(state, action);
    case StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
      return handleFail(state, action);
    case StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__REQUEST:
      return handleRequest(state, action);
    case StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__FAIL:
      return handleFail(state, action);
    case StateMainActionTypes.STATE_MAIN__DEPOSIT__REQUEST:
      return handleRequest(state, action);
    case StateMainActionTypes.STATE_MAIN__DEPOSIT__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateMainActionTypes.STATE_MAIN__DEPOSIT__FAIL:
      return handleFail(state, action);
    case StateMainActionTypes.STATE_MAIN__PURCHASE__REQUEST:
      return handleRequest(state, action);
    case StateMainActionTypes.STATE_MAIN__PURCHASE__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateMainActionTypes.STATE_MAIN__PURCHASE__FAIL:
      return handleFail(state, action);
    case StateMainActionTypes.STATE_MAIN__RESET__REQUEST:
      return handleRequest(state, action);
    case StateMainActionTypes.STATE_MAIN__RESET__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateMainActionTypes.STATE_MAIN__RESET__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
