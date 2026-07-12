import type { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/users/dtos/users.updateOnePartial.dto';
import type {
  FailAction,
  RequestAction,
  SaveNothingAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';
import type { StateSettingsReducer } from './stateSettings.types';

export const StateSettingsActionTypes = {
  STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
    'STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
    'STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
    'STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
  STATE_SETTINGS__GET_PROFILE__REQUEST: 'STATE_SETTINGS__GET_PROFILE__REQUEST',
  STATE_SETTINGS__GET_PROFILE__SUCCESS: 'STATE_SETTINGS__GET_PROFILE__SUCCESS',
  STATE_SETTINGS__GET_PROFILE__FAIL: 'STATE_SETTINGS__GET_PROFILE__FAIL',
  STATE_SETTINGS__UPDATE_PROFILE__REQUEST:
    'STATE_SETTINGS__UPDATE_PROFILE__REQUEST',
  STATE_SETTINGS__UPDATE_PROFILE__SUCCESS:
    'STATE_SETTINGS__UPDATE_PROFILE__SUCCESS',
  STATE_SETTINGS__UPDATE_PROFILE__FAIL: 'STATE_SETTINGS__UPDATE_PROFILE__FAIL',
  STATE_SETTINGS__RESET_PASSWORD__REQUEST:
    'STATE_SETTINGS__RESET_PASSWORD__REQUEST',
  STATE_SETTINGS__RESET_PASSWORD__SUCCESS:
    'STATE_SETTINGS__RESET_PASSWORD__SUCCESS',
  STATE_SETTINGS__RESET_PASSWORD__FAIL: 'STATE_SETTINGS__RESET_PASSWORD__FAIL',
  STATE_SETTINGS__SIGNOUT__REQUEST: 'STATE_SETTINGS__SIGNOUT__REQUEST',
  STATE_SETTINGS__SIGNOUT__SUCCESS: 'STATE_SETTINGS__SIGNOUT__SUCCESS',
  STATE_SETTINGS__SIGNOUT__FAIL: 'STATE_SETTINGS__SIGNOUT__FAIL',
} as const;
export type StateSettingsActionTypes = Enum<typeof StateSettingsActionTypes>;

export type StateSettingsUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    typeof StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<
      StateSettingsReducer['metadata']
    >
  >;

export type StateSettingsUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsUpdatePartialReducerMetadataFailAction = FailAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__FAIL
>;

export type StateSettingsGetProfileRequestAction = RequestAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__REQUEST,
  Record<string, never>
>;

export type StateSettingsGetProfileSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsGetProfileFailAction = FailAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__FAIL
>;

export type StateSettingsUpdateProfileRequestAction = RequestAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__REQUEST,
  { usersUpdateOnePartialDto: UsersUpdateOnePartialDto }
>;

export type StateSettingsUpdateProfileSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsUpdateProfileFailAction = FailAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__FAIL
>;

export type StateSettingsResetPasswordRequestAction = RequestAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__REQUEST,
  Record<string, never>
>;

export type StateSettingsResetPasswordSuccessAction = SaveNothingAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__SUCCESS
>;

export type StateSettingsResetPasswordFailAction = FailAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__FAIL
>;

export type StateSettingsSignoutRequestAction = RequestAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__REQUEST,
  Record<string, never>
>;

export type StateSettingsSignoutSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__SUCCESS,
    StateSettingsReducer['metadata']
  >;

export type StateSettingsSignoutFailAction = FailAction<
  typeof StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__FAIL
>;

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
