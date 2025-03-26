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
} from './stateMain.actions.types';

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
    default:
      return state;
  }
}
