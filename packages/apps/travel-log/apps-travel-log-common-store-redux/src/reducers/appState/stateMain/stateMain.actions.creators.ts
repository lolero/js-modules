import { v4 as uuidv4 } from 'uuid';
import type {
  StateMainUpdatePartialReducerMetadataFailAction,
  StateMainUpdatePartialReducerMetadataRequestAction,
  StateMainUpdatePartialReducerMetadataSuccessAction,
} from './stateMain.actions.types';
import { StateMainActionTypes } from './stateMain.actions.types';

export function createStateMainUpdatePartialReducerMetadataRequestAction(
  partialReducerMetadata: StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): StateMainUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    requestMetadata: {
      partialReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateMainUpdatePartialReducerMetadataSuccessAction(
  partialReducerMetadata: StateMainUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateMainUpdatePartialReducerMetadataSuccessAction['requestId'],
): StateMainUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata,
    requestId,
  };
}

export function createStateMainUpdatePartialReducerMetadataFailAction(
  error: StateMainUpdatePartialReducerMetadataFailAction['error'],
  requestId: StateMainUpdatePartialReducerMetadataFailAction['requestId'],
): StateMainUpdatePartialReducerMetadataFailAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL,
    error,
    requestId,
  };
}
