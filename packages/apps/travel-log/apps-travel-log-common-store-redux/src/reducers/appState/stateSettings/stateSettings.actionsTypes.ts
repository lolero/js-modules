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
  STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST = 'STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST',
  STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS = 'STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS',
  STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL = 'STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL',
  STATE_SETTINGS_GET_PROFILE_REQUEST = 'STATE_SETTINGS_GET_PROFILE_REQUEST',
  STATE_SETTINGS_GET_PROFILE_SUCCESS = 'STATE_SETTINGS_GET_PROFILE_SUCCESS',
  STATE_SETTINGS_GET_PROFILE_FAIL = 'STATE_SETTINGS_GET_PROFILE_FAIL',
  STATE_SETTINGS_UPDATE_PROFILE_REQUEST = 'STATE_SETTINGS_UPDATE_PROFILE_REQUEST',
  STATE_SETTINGS_UPDATE_PROFILE_SUCCESS = 'STATE_SETTINGS_UPDATE_PROFILE_SUCCESS',
  STATE_SETTINGS_UPDATE_PROFILE_FAIL = 'STATE_SETTINGS_UPDATE_PROFILE_FAIL',
  STATE_SETTINGS_RESET_PASSWORD_REQUEST = 'STATE_SETTINGS_RESET_PASSWORD_REQUEST',
  STATE_SETTINGS_RESET_PASSWORD_SUCCESS = 'STATE_SETTINGS_RESET_PASSWORD_SUCCESS',
  STATE_SETTINGS_RESET_PASSWORD_FAIL = 'STATE_SETTINGS_RESET_PASSWORD_FAIL',
  STATE_SETTINGS_SIGNOUT_REQUEST = 'STATE_SETTINGS_SIGNOUT_REQUEST',
  STATE_SETTINGS_SIGNOUT_SUCCESS = 'STATE_SETTINGS_SIGNOUT_SUCCESS',
  STATE_SETTINGS_SIGNOUT_FAIL = 'STATE_SETTINGS_SIGNOUT_FAIL',
}

export type StateSettingsUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<
      StateSettingsReducer['metadata']
    >
  >;

export type StateSettingsUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsUpdatePartialReducerMetadataFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL>;

export type StateSettingsGetProfileRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS_GET_PROFILE_REQUEST,
  Record<string, never>
>;

export type StateSettingsGetProfileSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS_GET_PROFILE_SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsGetProfileFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS_GET_PROFILE_FAIL>;

export type StateSettingsUpdateProfileRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PROFILE_REQUEST,
  { usersUpdateOnePartialDto: UsersUpdateOnePartialDto }
>;

export type StateSettingsUpdateProfileSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PROFILE_SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsUpdateProfileFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS_UPDATE_PROFILE_FAIL>;

export type StateSettingsResetPasswordRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS_RESET_PASSWORD_REQUEST,
  Record<string, never>
>;

export type StateSettingsResetPasswordSuccessAction =
  SaveNothingAction<StateSettingsActionTypes.STATE_SETTINGS_RESET_PASSWORD_SUCCESS>;

export type StateSettingsResetPasswordFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS_RESET_PASSWORD_FAIL>;

export type StateSettingsSignoutRequestAction = RequestAction<
  StateSettingsActionTypes.STATE_SETTINGS_SIGNOUT_REQUEST,
  Record<string, never>
>;

export type StateSettingsSignoutSuccessAction =
  SavePartialReducerMetadataAction<
    StateSettingsActionTypes.STATE_SETTINGS_SIGNOUT_SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsSignoutFailAction =
  FailAction<StateSettingsActionTypes.STATE_SETTINGS_SIGNOUT_FAIL>;

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
