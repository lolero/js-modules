import {
  handleFail,
  handleRequest,
  handleSaveNothing,
  handleSavePartialReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { StateAuthReducerHittingAction } from './stateAuth.actions.types';
import { StateAuthActionTypes } from './stateAuth.actions.types';
import { stateAuthInitialState } from './stateAuth.initialState';
import type { StateAuthReducer } from './stateAuth.types';

export function stateAuthReducer(
  state: StateAuthReducer = stateAuthInitialState,
  action: StateAuthReducerHittingAction,
): StateAuthReducer {
  switch (action.type) {
    case StateAuthActionTypes.STATE_AUTH__INITIALIZE__REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH__INITIALIZE__SUCCESS:
      return handleSaveNothing(state, action);
    case StateAuthActionTypes.STATE_AUTH__INITIALIZE__FAIL:
      return handleFail(state, action);
    case StateAuthActionTypes.STATE_AUTH__SIGNIN__REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH__SIGNIN__SUCCESS:
      return handleSaveNothing(state, action);
    case StateAuthActionTypes.STATE_AUTH__SIGNIN__FAIL:
      return handleFail(state, action);
    case StateAuthActionTypes.STATE_AUTH__SIGNOUT__REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH__SIGNOUT__SUCCESS:
      return handleSaveNothing(state, action);
    case StateAuthActionTypes.STATE_AUTH__SIGNOUT__FAIL:
      return handleFail(state, action);
    case StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
