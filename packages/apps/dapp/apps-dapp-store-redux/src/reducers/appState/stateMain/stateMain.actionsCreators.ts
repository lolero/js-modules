import { v4 as uuidv4 } from 'uuid';
import {
  StateMainActionTypes,
  StateMainUpdatePartialReducerMetadataFailAction,
  StateMainUpdatePartialReducerMetadataRequestAction,
  StateMainUpdatePartialReducerMetadataSuccessAction,
} from './stateMain.actionsTypes';

export function createStateMainUpdatePartialReducerMetadataRequestAction(
  partialStateMainReducerMetadata: StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): StateMainUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    requestMetadata: {
      partialReducerMetadata: partialStateMainReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateMainUpdatePartialReducerMetadataSuccessAction(
  partialStateMainReducerMetadata: StateMainUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateMainUpdatePartialReducerMetadataSuccessAction['requestId'],
): StateMainUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    partialReducerMetadata: partialStateMainReducerMetadata,
    requestId,
  };
}

export function createStateMainUpdatePartialReducerMetadataFailAction(
  error: StateMainUpdatePartialReducerMetadataFailAction['error'],
  requestId: StateMainUpdatePartialReducerMetadataFailAction['requestId'],
): StateMainUpdatePartialReducerMetadataFailAction {
  return {
    type: StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_FAIL,
    error,
    requestId,
  };
}
