import {
  FailAction,
  RequestAction,
  SaveNothingAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from 'normalized-reducers-utils';
import { StateAuthReducer } from './stateAuth.types';

export enum StateAuthActionTypes {
  STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST = 'STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST',
  STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS = 'STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS',
  STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_FAIL = 'STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_FAIL',
  STATE_AUTH_LOGIN_REQUEST = 'STATE_AUTH_LOGIN_REQUEST',
  STATE_AUTH_LOGIN_SUCCESS = 'STATE_AUTH_LOGIN_SUCCESS',
  STATE_AUTH_LOGIN_FAIL = 'STATE_AUTH_LOGIN_FAIL',
  STATE_AUTH_LOGOUT_REQUEST = 'STATE_AUTH_LOGOUT_REQUEST',
  STATE_AUTH_LOGOUT_SUCCESS = 'STATE_AUTH_LOGOUT_SUCCESS',
  STATE_AUTH_LOGOUT_FAIL = 'STATE_AUTH_LOGOUT_FAIL',
}

export type StateAuthUpdatePartialReducerMetadataRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateAuthReducer['metadata']>
>;

export type StateAuthUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    StateAuthReducer['metadata']
  >;

export type StateAuthUpdatePartialReducerMetadataFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_FAIL>;

export type StateAuthLoginRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH_LOGIN_REQUEST,
  { loginMethod: string }
>;

export type StateAuthLoginSuccessAction =
  SaveNothingAction<StateAuthActionTypes.STATE_AUTH_LOGIN_SUCCESS>;

export type StateAuthLoginFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH_LOGIN_FAIL>;

export type StateAuthLogoutRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH_LOGOUT_REQUEST,
  Record<string, never>
>;

export type StateAuthLogoutSuccessAction = SavePartialReducerMetadataAction<
  StateAuthActionTypes.STATE_AUTH_LOGOUT_SUCCESS,
  StateAuthReducer['metadata']
>;

export type StateAuthLogoutFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH_LOGOUT_FAIL>;

export type StateAuthReducerHittingAction =
  | StateAuthUpdatePartialReducerMetadataRequestAction
  | StateAuthUpdatePartialReducerMetadataSuccessAction
  | StateAuthUpdatePartialReducerMetadataFailAction
  | StateAuthLoginRequestAction
  | StateAuthLoginSuccessAction
  | StateAuthLoginFailAction
  | StateAuthLogoutRequestAction
  | StateAuthLogoutSuccessAction
  | StateAuthLogoutFailAction;
