import {
  FailAction,
  RequestAction,
  SaveNothingAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { KeycloakConfig } from 'keycloak-js';
import { SigninAction, StateAuthReducer } from './stateAuth.types';

export enum StateAuthActionTypes {
  STATE_AUTH__INITIALIZE__REQUEST = 'STATE_AUTH__INITIALIZE__REQUEST',
  STATE_AUTH__INITIALIZE__SUCCESS = 'STATE_AUTH__INITIALIZE__SUCCESS',
  STATE_AUTH__INITIALIZE__FAIL = 'STATE_AUTH__INITIALIZE__FAIL',
  STATE_AUTH__SIGNIN__REQUEST = 'STATE_AUTH__SIGNIN__REQUEST',
  STATE_AUTH__SIGNIN__SUCCESS = 'STATE_AUTH__SIGNIN__SUCCESS',
  STATE_AUTH__SIGNIN__FAIL = 'STATE_AUTH__SIGNIN__FAIL',
  STATE_AUTH__SIGNOUT__REQUEST = 'STATE_AUTH__SIGNOUT__REQUEST',
  STATE_AUTH__SIGNOUT__SUCCESS = 'STATE_AUTH__SIGNOUT__SUCCESS',
  STATE_AUTH__SIGNOUT__FAIL = 'STATE_AUTH__SIGNOUT__FAIL',
  STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST = 'STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS = 'STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL = 'STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
}

export type StateAuthInitializeRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH__INITIALIZE__REQUEST,
  {
    keycloakConfig: KeycloakConfig;
    onSigninCallback?: () => void;
    onSignoutCallback?: () => void;
  }
>;

export type StateAuthInitializeSuccessAction = SavePartialReducerMetadataAction<
  StateAuthActionTypes.STATE_AUTH__INITIALIZE__SUCCESS,
  StateAuthReducer['metadata']
>;

export type StateAuthInitializeFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH__INITIALIZE__FAIL>;

export type StateAuthSigninRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH__SIGNIN__REQUEST,
  {
    signinAction: SigninAction;
    redirectUri?: string;
    onSigninCallback?: () => void;
  }
>;

export type StateAuthSigninSuccessAction =
  SaveNothingAction<StateAuthActionTypes.STATE_AUTH__SIGNIN__SUCCESS>;

export type StateAuthSigninFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH__SIGNIN__FAIL>;

export type StateAuthSignoutRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH__SIGNOUT__REQUEST,
  {
    redirectUri?: string;
    onSignoutCallback?: () => void;
  }
>;

export type StateAuthSignoutSuccessAction =
  SaveNothingAction<StateAuthActionTypes.STATE_AUTH__SIGNOUT__SUCCESS>;

export type StateAuthSignoutFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH__SIGNOUT__FAIL>;

export type StateAuthUpdatePartialReducerMetadataRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateAuthReducer['metadata']>
>;

export type StateAuthUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateAuthReducer['metadata']
  >;

export type StateAuthUpdatePartialReducerMetadataFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL>;

export type StateAuthReducerHittingAction =
  | StateAuthInitializeRequestAction
  | StateAuthInitializeSuccessAction
  | StateAuthInitializeFailAction
  | StateAuthSigninRequestAction
  | StateAuthSigninSuccessAction
  | StateAuthSigninFailAction
  | StateAuthSignoutRequestAction
  | StateAuthSignoutSuccessAction
  | StateAuthSignoutFailAction
  | StateAuthUpdatePartialReducerMetadataRequestAction
  | StateAuthUpdatePartialReducerMetadataSuccessAction
  | StateAuthUpdatePartialReducerMetadataFailAction;
