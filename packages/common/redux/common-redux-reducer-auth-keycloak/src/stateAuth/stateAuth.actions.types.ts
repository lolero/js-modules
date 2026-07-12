import type {
  KeycloakInitOptions,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakServerConfig,
} from 'keycloak-js';
import type {
  FailAction,
  RequestAction,
  SaveNothingAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';
import type { SigninAction, StateAuthReducer } from './stateAuth.types';

export const StateAuthActionTypes = {
  STATE_AUTH__INITIALIZE__REQUEST: 'STATE_AUTH__INITIALIZE__REQUEST',
  STATE_AUTH__INITIALIZE__SUCCESS: 'STATE_AUTH__INITIALIZE__SUCCESS',
  STATE_AUTH__INITIALIZE__FAIL: 'STATE_AUTH__INITIALIZE__FAIL',
  STATE_AUTH__SIGNIN__REQUEST: 'STATE_AUTH__SIGNIN__REQUEST',
  STATE_AUTH__SIGNIN__SUCCESS: 'STATE_AUTH__SIGNIN__SUCCESS',
  STATE_AUTH__SIGNIN__FAIL: 'STATE_AUTH__SIGNIN__FAIL',
  STATE_AUTH__SIGNOUT__REQUEST: 'STATE_AUTH__SIGNOUT__REQUEST',
  STATE_AUTH__SIGNOUT__SUCCESS: 'STATE_AUTH__SIGNOUT__SUCCESS',
  STATE_AUTH__SIGNOUT__FAIL: 'STATE_AUTH__SIGNOUT__FAIL',
  STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
    'STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
    'STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
    'STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
} as const;
export type StateAuthActionTypes = Enum<typeof StateAuthActionTypes>;

export type StateAuthInitializeRequestAction = RequestAction<
  typeof StateAuthActionTypes.STATE_AUTH__INITIALIZE__REQUEST,
  {
    keycloakServerConfig: KeycloakServerConfig;
    keycloakInitOptions: KeycloakInitOptions;
    onSigninCallback?: () => void;
    onSignoutCallback?: () => void;
  }
>;

export type StateAuthInitializeSuccessAction = SavePartialReducerMetadataAction<
  typeof StateAuthActionTypes.STATE_AUTH__INITIALIZE__SUCCESS,
  StateAuthReducer['metadata']
>;

export type StateAuthInitializeFailAction = FailAction<
  typeof StateAuthActionTypes.STATE_AUTH__INITIALIZE__FAIL
>;

export type StateAuthSigninRequestAction = RequestAction<
  typeof StateAuthActionTypes.STATE_AUTH__SIGNIN__REQUEST,
  {
    signinAction: SigninAction;
    keycloakLoginOptions: KeycloakLoginOptions;
    onSigninCallback?: () => void;
  }
>;

export type StateAuthSigninSuccessAction = SaveNothingAction<
  typeof StateAuthActionTypes.STATE_AUTH__SIGNIN__SUCCESS
>;

export type StateAuthSigninFailAction = FailAction<
  typeof StateAuthActionTypes.STATE_AUTH__SIGNIN__FAIL
>;

export type StateAuthSignoutRequestAction = RequestAction<
  typeof StateAuthActionTypes.STATE_AUTH__SIGNOUT__REQUEST,
  {
    keycloakLogoutOptions: KeycloakLogoutOptions;
    onSignoutCallback?: () => void;
  }
>;

export type StateAuthSignoutSuccessAction = SaveNothingAction<
  typeof StateAuthActionTypes.STATE_AUTH__SIGNOUT__SUCCESS
>;

export type StateAuthSignoutFailAction = FailAction<
  typeof StateAuthActionTypes.STATE_AUTH__SIGNOUT__FAIL
>;

export type StateAuthUpdatePartialReducerMetadataRequestAction = RequestAction<
  typeof StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateAuthReducer['metadata']>
>;

export type StateAuthUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateAuthReducer['metadata']
  >;

export type StateAuthUpdatePartialReducerMetadataFailAction = FailAction<
  typeof StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__FAIL
>;

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
