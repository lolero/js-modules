import { v4 as uuidv4 } from 'uuid';
import type {
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
} from './stateAuth.actions.types';
import { StateAuthActionTypes } from './stateAuth.actions.types';

export const STATE_AUTH__INITIALIZE__REQUEST_ID =
  'STATE_AUTH__INITIALIZE__REQUEST_ID';
export function createStateAuthInitializeRequestAction(
  keycloakServerConfig: StateAuthInitializeRequestAction['requestMetadata']['keycloakServerConfig'],
  keycloakInitOptions: StateAuthInitializeRequestAction['requestMetadata']['keycloakInitOptions'],
  onSigninCallback?: StateAuthInitializeRequestAction['requestMetadata']['onSigninCallback'],
  onSignoutCallback?: StateAuthInitializeRequestAction['requestMetadata']['onSignoutCallback'],
): StateAuthInitializeRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__INITIALIZE__REQUEST,
    requestMetadata: {
      keycloakServerConfig,
      keycloakInitOptions,
      onSigninCallback,
      onSignoutCallback,
    },
    requestId: STATE_AUTH__INITIALIZE__REQUEST_ID,
  };
}

export function createStateAuthInitializeSuccessAction(
  partialReducerMetadata: StateAuthUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: string,
): StateAuthInitializeSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__INITIALIZE__SUCCESS,
    partialReducerMetadata,
    requestId,
  };
}

export function createStateAuthInitializeFailAction(
  error: string,
  requestId: string,
): StateAuthInitializeFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__INITIALIZE__FAIL,
    error,
    requestId,
  };
}

export const STATE_AUTH__SIGNIN__REQUEST_ID = 'STATE_AUTH__SIGNIN__REQUEST_ID';
export function createStateAuthSigninRequestAction(
  signinAction: StateAuthSigninRequestAction['requestMetadata']['signinAction'],
  keycloakLoginOptions: StateAuthSigninRequestAction['requestMetadata']['keycloakLoginOptions'],
  onSigninCallback?: StateAuthSigninRequestAction['requestMetadata']['onSigninCallback'],
): StateAuthSigninRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNIN__REQUEST,
    requestMetadata: {
      signinAction,
      keycloakLoginOptions,
      onSigninCallback,
    },
    requestId: STATE_AUTH__SIGNIN__REQUEST_ID,
  };
}

export function createStateAuthSigninSuccessAction(
  requestId: string,
): StateAuthSigninSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNIN__SUCCESS,
    requestId,
  };
}

export function createStateAuthSigninFailAction(
  error: string,
  requestId: string,
): StateAuthSigninFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNIN__FAIL,
    error,
    requestId,
  };
}

export const STATE_AUTH__SIGNOUT__REQUEST_ID =
  'STATE_AUTH__SIGNOUT__REQUEST_ID';
export function createStateAuthSignoutRequestAction(
  keycloakLogoutOptions: StateAuthSignoutRequestAction['requestMetadata']['keycloakLogoutOptions'],
  onSignoutCallback?: StateAuthSignoutRequestAction['requestMetadata']['onSignoutCallback'],
): StateAuthSignoutRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNOUT__REQUEST,
    requestMetadata: {
      keycloakLogoutOptions,
      onSignoutCallback,
    },
    requestId: STATE_AUTH__SIGNOUT__REQUEST_ID,
  };
}

export function createStateAuthSignoutSuccessAction(
  requestId: string,
): StateAuthSignoutSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNOUT__SUCCESS,
    requestId,
  };
}

export function createStateAuthSignoutFailAction(
  error: string,
  requestId: string,
): StateAuthSignoutFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNOUT__FAIL,
    error,
    requestId,
  };
}

export function createStateAuthUpdatePartialReducerMetadataRequestAction(
  partialReducerMetadata: StateAuthUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): StateAuthUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    requestMetadata: {
      partialReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateAuthUpdatePartialReducerMetadataSuccessAction(
  partialReducerMetadata: StateAuthUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId?: string,
): StateAuthUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata,
    requestId,
  };
}

export function createStateAuthUpdatePartialReducerMetadataFailAction(
  error: string,
  requestId: string,
): StateAuthUpdatePartialReducerMetadataFailAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL,
    error,
    requestId,
  };
}
