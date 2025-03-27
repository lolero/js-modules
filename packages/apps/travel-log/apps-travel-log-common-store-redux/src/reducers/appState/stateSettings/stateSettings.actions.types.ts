import {
  FailAction,
  RequestAction,
  SaveNothingAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';
import { StateSettingsReducer } from './stateSettings.types';

export enum StateSettingsActionTypes {
  STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST = 'STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS = 'STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL = 'STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
  STATE_SETTINGS__GET_PROFILE__REQUEST = 'STATE_SETTINGS__GET_PROFILE__REQUEST',
  STATE_SETTINGS__GET_PROFILE__SUCCESS = 'STATE_SETTINGS__GET_PROFILE__SUCCESS',
  STATE_SETTINGS__GET_PROFILE__FAIL = 'STATE_SETTINGS__GET_PROFILE__FAIL',
  STATE_SETTINGS__UPDATE_PROFILE__REQUEST = 'STATE_SETTINGS__UPDATE_PROFILE__REQUEST',
  STATE_SETTINGS__UPDATE_PROFILE__SUCCESS = 'STATE_SETTINGS__UPDATE_PROFILE__SUCCESS',
  STATE_SETTINGS__UPDATE_PROFILE__FAIL = 'STATE_SETTINGS__UPDATE_PROFILE__FAIL',
  STATE_SETTINGS__RESET_PASSWORD__REQUEST = 'STATE_SETTINGS__RESET_PASSWORD__REQUEST',
  STATE_SETTINGS__RESET_PASSWORD__SUCCESS = 'STATE_SETTINGS__RESET_PASSWORD__SUCCESS',
  STATE_SETTINGS__RESET_PASSWORD__FAIL = 'STATE_SETTINGS__RESET_PASSWORD__FAIL',
  STATE_SETTINGS__SIGNOUT__REQUEST = 'STATE_SETTINGS__SIGNOUT__REQUEST',
  STATE_SETTINGS__SIGNOUT__SUCCESS = 'STATE_SETTINGS__SIGNOUT__SUCCESS',
  STATE_SETTINGS__SIGNOUT__FAIL = 'STATE_SETTINGS__SIGNOUT__FAIL',
}

export type StateSettingsUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<
      StateSettingsReducer['metadata']
    >
  >;

export type StateSettingsUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsUpdatePartialReducerMetadataFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL>;

export type StateSettingsGetProfileRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__REQUEST,
  Record<string, never>
>;

export type StateSettingsGetProfileSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsGetProfileFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__FAIL>;

export type StateSettingsUpdateProfileRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__REQUEST,
  { usersUpdateOnePartialDto: UsersUpdateOnePartialDto }
>;

export type StateSettingsUpdateProfileSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsUpdateProfileFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__FAIL>;

export type StateSettingsResetPasswordRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__REQUEST,
  Record<string, never>
>;

export type StateSettingsResetPasswordSuccessAction =
  SaveNothingAction<StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__SUCCESS>;

export type StateSettingsResetPasswordFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__FAIL>;

export type StateSettingsSignoutRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__REQUEST,
  Record<string, never>
>;

export type StateSettingsSignoutSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsSignoutFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__FAIL>;

export type StateSettingsReducerHittingAction =
  | StateSettingsUpdatePartialReducerMetadataRequestAction
  | StateSettingsUpdatePartialReducerMetadataSuccessAction
  | StateSettingsUpdatePartialReducerMetadataFailAction
  | StateSettingsGetProfileRequestAction
  | StateSettingsGetProfileSuccessAction
  | StateSettingsGetProfileFailAction
  | StateSettingsUpdateProfileRequestAction
  | StateSettingsUpdateProfileSuccessAction
  | StateSettingsUpdateProfileFailAction
  | StateSettingsResetPasswordRequestAction
  | StateSettingsResetPasswordSuccessAction
  | StateSettingsResetPasswordFailAction
  | StateSettingsSignoutRequestAction
  | StateSettingsSignoutSuccessAction
  | StateSettingsSignoutFailAction;
