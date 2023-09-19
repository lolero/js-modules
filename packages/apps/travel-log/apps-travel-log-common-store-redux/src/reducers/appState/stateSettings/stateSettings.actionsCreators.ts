import { v4 as uuidv4 } from 'uuid';
import {
  StateSettingsActionTypes,
  StateSettingsGetProfileFailAction,
  StateSettingsGetProfileRequestAction,
  StateSettingsGetProfileSuccessAction,
  StateSettingsResetPasswordFailAction,
  StateSettingsResetPasswordRequestAction,
  StateSettingsResetPasswordSuccessAction,
  StateSettingsSignoutFailAction,
  StateSettingsSignoutRequestAction,
  StateSettingsSignoutSuccessAction,
  StateSettingsUpdatePartialReducerMetadataFailAction,
  StateSettingsUpdatePartialReducerMetadataRequestAction,
  StateSettingsUpdatePartialReducerMetadataSuccessAction,
  StateSettingsUpdateProfileFailAction,
  StateSettingsUpdateProfileRequestAction,
  StateSettingsUpdateProfileSuccessAction,
} from './stateSettings.actionsTypes';

export function createStateSettingsUpdatePartialReducerMetadataRequestAction(
  partialStateSettingsReducerMetadata: StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): StateSettingsUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    requestMetadata: {
      partialReducerMetadata: partialStateSettingsReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateSettingsUpdatePartialReducerMetadataSuccessAction(
  partialStateSettingsReducerMetadata: StateSettingsUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateSettingsUpdatePartialReducerMetadataSuccessAction['requestId'],
): StateSettingsUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata: partialStateSettingsReducerMetadata,
    requestId,
  };
}

export function createStateSettingsUpdatePartialReducerMetadataFailAction(
  error: StateSettingsUpdatePartialReducerMetadataFailAction['error'],
  requestId: StateSettingsUpdatePartialReducerMetadataFailAction['requestId'],
): StateSettingsUpdatePartialReducerMetadataFailAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL,
    error,
    requestId,
  };
}

export const STATE_SETTINGS__GET_PROFILE__REQUEST_ID =
  'STATE_SETTINGS__GET_PROFILE__REQUEST_ID';
export function createStateSettingsGetProfileRequestAction(): StateSettingsGetProfileRequestAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__REQUEST,
    requestMetadata: {},
    requestId: STATE_SETTINGS__GET_PROFILE__REQUEST_ID,
  };
}

export function createStateSettingsGetProfileSuccessAction(
  partialStateSettingsReducerMetadata: StateSettingsGetProfileSuccessAction['partialReducerMetadata'],
  requestId: StateSettingsGetProfileSuccessAction['requestId'],
  statusCode: StateSettingsGetProfileSuccessAction['statusCode'],
): StateSettingsGetProfileSuccessAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__SUCCESS,
    partialReducerMetadata: partialStateSettingsReducerMetadata,
    requestId,
    statusCode,
  };
}

export function createStateSettingsGetProfileFailAction(
  error: StateSettingsGetProfileFailAction['error'],
  requestId: StateSettingsGetProfileFailAction['requestId'],
): StateSettingsGetProfileFailAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__FAIL,
    error,
    requestId,
  };
}

export const STATE_SETTINGS__UPDATE_PROFILE__REQUEST_ID =
  'STATE_SETTINGS__UPDATE_PROFILE__REQUEST_ID';
export function createStateSettingsUpdateProfileRequestAction(
  usersUpdateOnePartialDto: StateSettingsUpdateProfileRequestAction['requestMetadata']['usersUpdateOnePartialDto'],
): StateSettingsUpdateProfileRequestAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__REQUEST,
    requestMetadata: {
      usersUpdateOnePartialDto,
    },
    requestId: STATE_SETTINGS__UPDATE_PROFILE__REQUEST_ID,
  };
}

export function createStateSettingsUpdateProfileSuccessAction(
  partialStateSettingsReducerMetadata: StateSettingsUpdateProfileSuccessAction['partialReducerMetadata'],
  requestId: StateSettingsUpdateProfileSuccessAction['requestId'],
  statusCode: StateSettingsUpdateProfileSuccessAction['statusCode'],
): StateSettingsUpdateProfileSuccessAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__SUCCESS,
    partialReducerMetadata: partialStateSettingsReducerMetadata,
    requestId,
    statusCode,
  };
}

export function createStateSettingsUpdateProfileFailAction(
  error: StateSettingsUpdateProfileFailAction['error'],
  requestId: StateSettingsUpdateProfileFailAction['requestId'],
): StateSettingsUpdateProfileFailAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__FAIL,
    error,
    requestId,
  };
}

export const STATE_SETTINGS__RESET_PASSWORD__REQUEST_ID =
  'STATE_SETTINGS__RESET_PASSWORD__REQUEST_ID';
export function createStateSettingsResetPasswordRequestAction(): StateSettingsResetPasswordRequestAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createStateSettingsResetPasswordSuccessAction(
  requestId: StateSettingsResetPasswordSuccessAction['requestId'],
  statusCode: StateSettingsResetPasswordSuccessAction['statusCode'],
): StateSettingsResetPasswordSuccessAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__SUCCESS,
    requestId,
    statusCode,
  };
}

export function createStateSettingsResetPasswordFailAction(
  error: StateSettingsResetPasswordFailAction['error'],
  requestId: StateSettingsResetPasswordFailAction['requestId'],
): StateSettingsResetPasswordFailAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__FAIL,
    error,
    requestId,
  };
}

export const STATE_SETTINGS__SIGNOUT__REQUEST_ID =
  'STATE_SETTINGS__SIGNOUT__REQUEST_ID';
export function createStateSettingsSignoutRequestAction(): StateSettingsSignoutRequestAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__REQUEST,
    requestMetadata: {},
    requestId: STATE_SETTINGS__SIGNOUT__REQUEST_ID,
  };
}

export function createStateSettingsSignoutSuccessAction(
  partialStateSettingsReducerMetadata: StateSettingsSignoutSuccessAction['partialReducerMetadata'],
  requestId: StateSettingsSignoutSuccessAction['requestId'],
): StateSettingsSignoutSuccessAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__SUCCESS,
    partialReducerMetadata: partialStateSettingsReducerMetadata,
    requestId,
  };
}

export function createStateSettingsSignoutFailAction(
  error: StateSettingsSignoutFailAction['error'],
  requestId: StateSettingsSignoutFailAction['requestId'],
): StateSettingsSignoutFailAction {
  return {
    type: StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__FAIL,
    error,
    requestId,
  };
}
