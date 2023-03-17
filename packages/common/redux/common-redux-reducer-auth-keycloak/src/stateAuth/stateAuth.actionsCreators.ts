import { v4 as uuidv4 } from 'uuid';
import { KeycloakConfig } from 'keycloak-js';
import {
  StateAuthActionTypes,
  StateAuthInitializeFailAction,
  StateAuthInitializeRequestAction,
  StateAuthInitializeSuccessAction,
  StateAuthSigninFailAction,
  StateAuthSigninRequestAction,
  StateAuthSigninSuccessAction,
  StateAuthSignoutFailAction,
  StateAuthSignoutRequestAction,
  StateAuthSignoutSuccessAction,
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

export function createStateAuthInitializeRequestAction(
  keycloakConfig: KeycloakConfig,
): StateAuthInitializeRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_INITIALIZE_REQUEST,
    requestMetadata: {
      keycloakConfig,
    },
    requestId: uuidv4(),
  };
}

export function createStateAuthInitializeSuccessAction(
  partialStateAuthReducerMetadata: StateAuthUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: string,
): StateAuthInitializeSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_INITIALIZE_SUCCESS,
    partialReducerMetadata: partialStateAuthReducerMetadata,
    requestId,
  };
}

export function createStateAuthInitializeFailAction(
  error: string,
  requestId: string,
): StateAuthInitializeFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_INITIALIZE_FAIL,
    error,
    requestId,
  };
}

export function createStateAuthSigninRequestAction(
  signinAction: StateAuthSigninRequestAction['requestMetadata']['signinAction'],
  redirectUri?: StateAuthSigninRequestAction['requestMetadata']['redirectUri'],
): StateAuthSigninRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_SIGNIN_REQUEST,
    requestMetadata: {
      signinAction,
      redirectUri,
    },
    requestId: uuidv4(),
  };
}

export function createStateAuthSigninSuccessAction(
  partialStateAuthReducerMetadata: StateAuthUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: string,
): StateAuthSigninSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_SIGNIN_SUCCESS,
    partialReducerMetadata: partialStateAuthReducerMetadata,
    requestId,
  };
}

export function createStateAuthSigninFailAction(
  error: string,
  requestId: string,
): StateAuthSigninFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_SIGNIN_FAIL,
    error,
    requestId,
  };
}

export function createStateAuthSignoutRequestAction(
  redirectUri?: StateAuthSignoutRequestAction['requestMetadata']['redirectUri'],
): StateAuthSignoutRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_SIGNOUT_REQUEST,
    requestMetadata: {
      redirectUri,
    },
    requestId: uuidv4(),
  };
}

export function createStateAuthSignoutSuccessAction(
  partialStateAuthReducerMetadata: StateAuthSignoutSuccessAction['partialReducerMetadata'],
  requestId: string,
): StateAuthSignoutSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_SIGNOUT_SUCCESS,
    partialReducerMetadata: partialStateAuthReducerMetadata,
    requestId,
  };
}

export function createStateAuthSignoutFailAction(
  error: string,
  requestId: string,
): StateAuthSignoutFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH_SIGNOUT_FAIL,
    error,
    requestId,
  };
}
