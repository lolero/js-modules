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
    case StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_FAIL:
      return handleFail(state, action);
    case StateAuthActionTypes.STATE_AUTH_INITIALIZE_REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH_INITIALIZE_SUCCESS:
      return handleSaveNothing(state, action);
    case StateAuthActionTypes.STATE_AUTH_INITIALIZE_FAIL:
      return handleFail(state, action);
    case StateAuthActionTypes.STATE_AUTH_SIGNIN_REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH_SIGNIN_SUCCESS:
      return handleSaveNothing(state, action);
    case StateAuthActionTypes.STATE_AUTH_SIGNIN_FAIL:
      return handleFail(state, action);
    case StateAuthActionTypes.STATE_AUTH_SIGNOUT_REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH_SIGNOUT_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateAuthActionTypes.STATE_AUTH_SIGNOUT_FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
