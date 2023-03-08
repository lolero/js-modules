import {
  handleFail,
  handleRequest,
  handleSaveNothing,
  handleSavePartialReducerMetadata,
} from 'normalized-reducers-utils';
import { StateAuthReducer } from './stateAuth.types';
import { stateAuthInitialState } from './stateAuth.initialState';
import {
  StateAuthActionTypes,
  StateAuthReducerHittingAction,
} from './stateAuth.actionsTypes';

function stateAuthReducer(
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
    case StateAuthActionTypes.STATE_AUTH_LOGIN_REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH_LOGIN_SUCCESS:
      return handleSaveNothing(state, action);
    case StateAuthActionTypes.STATE_AUTH_LOGIN_FAIL:
      return handleFail(state, action);
    case StateAuthActionTypes.STATE_AUTH_LOGOUT_REQUEST:
      return handleRequest(state, action);
    case StateAuthActionTypes.STATE_AUTH_LOGOUT_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateAuthActionTypes.STATE_AUTH_LOGOUT_FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}

export default stateAuthReducer;
