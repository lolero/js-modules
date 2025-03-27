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
} from './stateSettings.actions.types';

export function stateSettingsReducer(
  // eslint-disable-next-line default-param-last
  state: StateSettingsReducer = stateSettingsInitialState,
  action: StateSettingsReducerHittingAction,
): StateSettingsReducer {
  switch (action.type) {
    case StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__SUCCESS:
      return handleSaveNothing(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__FAIL:
      return handleFail(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__REQUEST:
      return handleRequest(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
