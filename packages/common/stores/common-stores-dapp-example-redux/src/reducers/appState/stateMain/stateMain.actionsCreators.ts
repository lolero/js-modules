import { v4 as uuidv4 } from 'uuid';
import {
  StateMainActionTypes,
  StateMainUpdatePartialReducerMetadataFailAction,
  StateMainUpdatePartialReducerMetadataRequestAction,
  StateMainUpdatePartialReducerMetadataSuccessAction,
} from './stateMain.actionsTypes';
import { StateMainReducer } from './stateMain.types';

export function createStateMainUpdatePartialReducerMetadataRequestAction(
  partialStateMainReducerMetadata: Partial<StateMainReducer['metadata']>,
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
  partialStateMainReducerMetadata: Partial<StateMainReducer['metadata']>,
  requestId: string,
): StateMainUpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    partialReducerMetadata: partialStateMainReducerMetadata,
    requestId,
  };
}

export function createStateMainUpdatePartialReducerMetadataFailAction(
  error: string,
  requestId: string,
): StateMainUpdatePartialReducerMetadataFailAction {
  return {
    type: StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_FAIL,
    error,
    requestId,
  };
}
