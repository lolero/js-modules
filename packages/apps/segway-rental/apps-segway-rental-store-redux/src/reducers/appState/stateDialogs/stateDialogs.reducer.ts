import {
  handleFail,
  handleRequest,
  handleSaveWholeReducerMetadata,
  handleSavePartialReducerMetadata,
} from 'normalized-reducers-utils';
import { StateDialogsReducer } from './stateDialogs.types';
import { stateDialogsInitialState } from './stateDialogs.initialState';
import {
  StateDialogsActionTypes,
  StateDialogsReducerHittingAction,
} from './stateDialogs.actionsTypes';

function stateDialogsReducer(
  // eslint-disable-next-line default-param-last
  state: StateDialogsReducer = stateDialogsInitialState,
  action: StateDialogsReducerHittingAction,
): StateDialogsReducer {
  switch (action.type) {
    case StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_REQUEST:
      return handleRequest(state, action);
    case StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_SUCCESS:
      return handleSaveWholeReducerMetadata(state, action);
    case StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_FAIL:
      return handleFail(state, action);
    case StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST:
      return handleRequest(state, action);
    case StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}

export default stateDialogsReducer;
