import {
  handleFail,
  handleRequest,
  handleSaveNothing,
  handleSavePartialReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateSettingsReducer } from './stateSettings.types';
import { stateSettingsInitialState } from './stateSettings.initialState';
import {
  StateSettingsActionTypes,
  StateSettingsReducerHittingAction,
} from './stateSettings.actionsTypes';

export function stateSettingsReducer(
  // eslint-disable-next-line default-param-last
  state: StateSettingsReducer = stateSettingsInitialState,
  action: StateSettingsReducerHittingAction,
): StateSettingsReducer {
  switch (action.type) {
    case StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_GET_PROFILE_REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_GET_PROFILE_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_GET_PROFILE_FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PROFILE_REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PROFILE_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PROFILE_FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_RESET_PASSWORD_REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_RESET_PASSWORD_SUCCESS:
      return handleSaveNothing(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_RESET_PASSWORD_FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_SIGNOUT_REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_SIGNOUT_SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS_SIGNOUT_FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
