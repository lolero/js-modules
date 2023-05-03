import { v4 as uuidv4 } from 'uuid';
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

export function createStateAuthInitializeRequestAction(
  keycloakConfig: StateAuthInitializeRequestAction['requestMetadata']['keycloakConfig'],
  onSigninActionCreator?: StateAuthInitializeRequestAction['requestMetadata']['onSigninActionCreator'],
  onSignoutActionCreator?: StateAuthInitializeRequestAction['requestMetadata']['onSignoutActionCreator'],
): StateAuthInitializeRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__INITIALIZE__REQUEST,
    requestMetadata: {
      keycloakConfig,
      onSigninActionCreator,
      onSignoutActionCreator,
    },
    requestId: uuidv4(),
  };
}

export function createStateAuthInitializeSuccessAction(
  partialStateAuthReducerMetadata: StateAuthUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: string,
): StateAuthInitializeSuccessAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__INITIALIZE__SUCCESS,
    partialReducerMetadata: partialStateAuthReducerMetadata,
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

export function createStateAuthSigninRequestAction(
  signinAction: StateAuthSigninRequestAction['requestMetadata']['signinAction'],
  redirectUri?: StateAuthSigninRequestAction['requestMetadata']['redirectUri'],
  onSigninActionCreator?: StateAuthSigninRequestAction['requestMetadata']['onSigninActionCreator'],
): StateAuthSigninRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNIN__REQUEST,
    requestMetadata: {
      signinAction,
      redirectUri,
      onSigninActionCreator,
    },
    requestId: uuidv4(),
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

export function createStateAuthSignoutRequestAction(
  redirectUri?: StateAuthSignoutRequestAction['requestMetadata']['redirectUri'],
  onSignoutActionCreator?: StateAuthSignoutRequestAction['requestMetadata']['onSignoutActionCreator'],
): StateAuthSignoutRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__SIGNOUT__REQUEST,
    requestMetadata: {
      redirectUri,
      onSignoutActionCreator,
    },
    requestId: uuidv4(),
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
  partialStateAuthReducerMetadata: StateAuthUpdatePartialReducerMetadataRequestAction['requestMetadata'],
): StateAuthUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
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
    type: StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata: partialStateAuthReducerMetadata,
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
