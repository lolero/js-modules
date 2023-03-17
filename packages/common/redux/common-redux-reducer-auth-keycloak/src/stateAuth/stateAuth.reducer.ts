import {
  handleFail,
  handleRequest,
  handleSaveNothing,
  handleSavePartialReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateAuthReducer } from './stateAuth.types';
import { stateAuthInitialState } from './stateAuth.initialState';
import {
  StateAuthActionTypes,
  StateAuthReducerHittingAction,
} from './stateAuth.actionsTypes';

export function stateAuthReducer(
  // eslint-disable-next-line default-param-last
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
