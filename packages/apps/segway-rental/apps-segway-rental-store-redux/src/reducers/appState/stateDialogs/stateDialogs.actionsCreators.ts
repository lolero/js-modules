import { v4 as uuidv4 } from 'uuid';
import {
  StateDialogsActionTypes,
  StateDialogsUpdatePartialReducerMetadataFailAction,
  StateDialogsUpdatePartialReducerMetadataRequestAction,
  StateDialogsUpdatePartialReducerMetadataSuccessAction,
  StateDialogsUpdateWholeReducerMetadataFailAction,
  StateDialogsUpdateWholeReducerMetadataRequestAction,
  StateDialogsUpdateWholeReducerMetadataSuccessAction,
} from './stateDialogs.actionsTypes';
import { StateDialogsReducer } from './stateDialogs.types';

export function createStateDialogsUpdateWholeReducerMetadataRequestAction(
  wholeStateDialogsReducerMetadata: StateDialogsReducer['metadata'],
): StateDialogsUpdateWholeReducerMetadataRequestAction {
  return {
    type: StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_REQUEST,
    requestMetadata: {
      wholeReducerMetadata: wholeStateDialogsReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateDialogsUpdateWholeReducerMetadataSuccessAction(
  wholeStateDialogsReducerMetadata: StateDialogsReducer['metadata'],
  requestId: string,
): StateDialogsUpdateWholeReducerMetadataSuccessAction {
  return {
    type: StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_SUCCESS,
    wholeReducerMetadata: wholeStateDialogsReducerMetadata,
    requestId,
  };
}

export function createStateDialogsUpdateWholeReducerMetadataFailAction(
  error: string,
  requestId: string,
): StateDialogsUpdateWholeReducerMetadataFailAction {
  return {
    type: StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_FAIL,
    error,
    requestId,
  };
}

export function createStateDialogsUpdatePartialReducerMetadataRequestAction(
  partialStateDialogsReducerMetadata: Partial<StateDialogsReducer['metadata']>,
): StateDialogsUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    requestMetadata: {
      partialReducerMetadata: partialStateDialogsReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateDialogsUpdatePartialReducerMetadataSuccessAction(
  partialStateDialogsReducerMetadata: Partial<StateDialogsReducer['metadata']>,
  requestId: string,
): StateDialogsUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    partialReducerMetadata: partialStateDialogsReducerMetadata,
    requestId,
  };
}

export function createStateDialogsUpdatePartialReducerMetadataFailAction(
  error: string,
  requestId: string,
): StateDialogsUpdatePartialReducerMetadataFailAction {
  return {
    type: StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_FAIL,
    error,
    requestId,
  };
}
