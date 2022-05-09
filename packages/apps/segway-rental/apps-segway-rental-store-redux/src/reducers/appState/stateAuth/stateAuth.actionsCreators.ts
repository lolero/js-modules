import { v4 as uuidv4 } from 'uuid';
import {
  StateAuthActionTypes,
  StateAuthLoginFailAction,
  StateAuthLoginRequestAction,
  StateAuthLoginSuccessAction,
  StateAuthLogoutFailAction,
  StateAuthLogoutRequestAction,
  StateAuthLogoutSuccessAction,
  StateAuthUpdatePartialReducerMetadataFailAction,
  StateAuthUpdatePartialReducerMetadataRequestAction,
  StateAuthUpdatePartialReducerMetadataSuccessAction,
} from './stateAuth.actionsTypes';

export function createStateAuthUpdatePartialReducerMetadataRequestAction(
  partialStateAuthReducerMetadata: StateAuthUpdatePartialReducerMetadataRequestAction['requestMetadata'],
): StateAuthUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    requestMetadata: {
      partialReducerMetadata: partialStateAuthReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateAuthUpdatePartialReducerMetadataSuccessAction(
  partialStateAuthReducerMetadata: StateAuthUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId?: string,
): StateAuthUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    partialReducerMetadata: partialStateAuthReducerMetadata,
    requestId,
  };
}

export function createStateAuthUpdatePartialReducerMetadataFailAction(
  error: string,
  requestId: string,
): StateAuthUpdatePartialReducerMetadataFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_FAIL,
    error,
    requestId,
  };
}

export function createStateAuthLoginRequestAction(
  loginMethod: StateAuthLoginRequestAction['requestMetadata']['loginMethod'],
): StateAuthLoginRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_LOGIN_REQUEST,
    requestMetadata: {
      loginMethod,
    },
    requestId: uuidv4(),
  };
}

export function createStateAuthLoginSuccessAction(
  requestId: string,
): StateAuthLoginSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_LOGIN_SUCCESS,
    requestId,
  };
}

export function createStateAuthLoginFailAction(
  error: string,
  requestId: string,
): StateAuthLoginFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_LOGIN_FAIL,
    error,
    requestId,
  };
}

export function createStateAuthLogoutRequestAction(): StateAuthLogoutRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_LOGOUT_REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createStateAuthLogoutSuccessAction(
  partialStateAuthReducerMetadata: StateAuthLogoutSuccessAction['partialReducerMetadata'],
  requestId: string,
): StateAuthLogoutSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_LOGOUT_SUCCESS,
    partialReducerMetadata: partialStateAuthReducerMetadata,
    requestId,
  };
}

export function createStateAuthLogoutFailAction(
  error: string,
  requestId: string,
): StateAuthLogoutFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_LOGOUT_FAIL,
    error,
    requestId,
  };
}
