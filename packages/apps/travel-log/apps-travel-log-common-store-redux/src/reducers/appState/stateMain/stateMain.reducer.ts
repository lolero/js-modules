import {
  handleFail,
  handleRequest,
  handleSavePartialReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { StateMainReducerHittingAction } from './stateMain.actions.types';
import { StateMainActionTypes } from './stateMain.actions.types';
import { stateMainInitialState } from './stateMain.initialState';
import type { StateMainReducer } from './stateMain.types';

export function stateMainReducer(
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
    default:
      return state;
  }
}
