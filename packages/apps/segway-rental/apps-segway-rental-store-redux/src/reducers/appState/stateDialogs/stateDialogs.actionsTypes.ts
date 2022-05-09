import {
  FailAction,
  RequestAction,
  SaveWholeReducerMetadataAction,
  SavePartialReducerMetadataAction,
  UpdateWholeReducerMetadataRequestMetadata,
  UpdatePartialReducerMetadataRequestMetadata,
} from 'normalized-reducers-utils';
import { StateDialogsReducer } from './stateDialogs.types';

export enum StateDialogsActionTypes {
  STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_REQUEST = 'STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_REQUEST',
  STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_SUCCESS = 'STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_SUCCESS',
  STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_FAIL = 'STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_FAIL',
  STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST = 'STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST',
  STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS = 'STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS',
  STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL = 'STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL',
}

export type StateDialogsUpdateWholeReducerMetadataRequestAction = RequestAction<
  StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_REQUEST,
  UpdateWholeReducerMetadataRequestMetadata<StateDialogsReducer['metadata']>
>;

export type StateDialogsUpdateWholeReducerMetadataSuccessAction =
  SaveWholeReducerMetadataAction<
    StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_SUCCESS,
    StateDialogsReducer['metadata']
  >;

export type StateDialogsUpdateWholeReducerMetadataFailAction =
  FailAction<StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_FAIL>;

export type StateDialogsUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<StateDialogsReducer['metadata']>
  >;

export type StateDialogsUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    StateDialogsReducer['metadata']
  >;

export type StateDialogsUpdatePartialReducerMetadataFailAction =
  FailAction<StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL>;

export type StateDialogsReducerHittingAction =
  | StateDialogsUpdateWholeReducerMetadataRequestAction
  | StateDialogsUpdateWholeReducerMetadataSuccessAction
  | StateDialogsUpdateWholeReducerMetadataFailAction
  | StateDialogsUpdatePartialReducerMetadataRequestAction
  | StateDialogsUpdatePartialReducerMetadataSuccessAction
  | StateDialogsUpdatePartialReducerMetadataFailAction;
