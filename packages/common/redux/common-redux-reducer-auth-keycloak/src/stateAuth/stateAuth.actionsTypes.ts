import {
  FailAction,
  RequestAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { SigninAction, StateAuthReducer } from './stateAuth.types';

export enum StateAuthActionTypes {
  STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST = 'STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST',
  STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS = 'STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS',
  STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_FAIL = 'STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_FAIL',
  STATE_AUTH_SIGNIN_REQUEST = 'STATE_AUTH_SIGNIN_REQUEST',
  STATE_AUTH_SIGNIN_SUCCESS = 'STATE_AUTH_SIGNIN_SUCCESS',
  STATE_AUTH_SIGNIN_FAIL = 'STATE_AUTH_SIGNIN_FAIL',
  STATE_AUTH_SIGNOUT_REQUEST = 'STATE_AUTH_SIGNOUT_REQUEST',
  STATE_AUTH_SIGNOUT_SUCCESS = 'STATE_AUTH_SIGNOUT_SUCCESS',
  STATE_AUTH_SIGNOUT_FAIL = 'STATE_AUTH_SIGNOUT_FAIL',
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

export type StateAuthSigninRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH_SIGNIN_REQUEST,
  {
    signinAction: SigninAction;
    redirectUri?: string;
  }
>;

export type StateAuthSigninSuccessAction = SavePartialReducerMetadataAction<
  StateAuthActionTypes.STATE_AUTH_SIGNIN_SUCCESS,
  StateAuthReducer['metadata']
>;

export type StateAuthSigninFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH_SIGNIN_FAIL>;

export type StateAuthSignoutRequestAction = RequestAction<
  StateAuthActionTypes.STATE_AUTH_SIGNOUT_REQUEST,
  {
    redirectUri?: string;
  }
>;

export type StateAuthSignoutSuccessAction = SavePartialReducerMetadataAction<
  StateAuthActionTypes.STATE_AUTH_SIGNOUT_SUCCESS,
  StateAuthReducer['metadata']
>;

export type StateAuthSignoutFailAction =
  FailAction<StateAuthActionTypes.STATE_AUTH_SIGNOUT_FAIL>;

export type StateAuthReducerHittingAction =
  | StateAuthUpdatePartialReducerMetadataRequestAction
  | StateAuthUpdatePartialReducerMetadataSuccessAction
  | StateAuthUpdatePartialReducerMetadataFailAction
  | StateAuthSigninRequestAction
  | StateAuthSigninSuccessAction
  | StateAuthSigninFailAction
  | StateAuthSignoutRequestAction
  | StateAuthSignoutSuccessAction
  | StateAuthSignoutFailAction;
