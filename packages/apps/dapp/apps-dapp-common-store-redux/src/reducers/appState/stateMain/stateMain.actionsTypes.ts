import {
  FailAction,
  RequestAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateMainReducer } from './stateMain.types';

export enum StateMainActionTypes {
  STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST = 'STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST',
  STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS = 'STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS',
  STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_FAIL = 'STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_FAIL',
}

export type StateMainUpdatePartialReducerMetadataRequestAction = RequestAction<
  StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateMainReducer['metadata']>
>;

export type StateMainUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    StateMainReducer['metadata']
  >;

export type StateMainUpdatePartialReducerMetadataFailAction =
  FailAction<StateMainActionTypes.STATE_MAIN_UPDATE_PARTIAL_REDUCER_METADATA_FAIL>;

export type StateMainReducerHittingAction =
  | StateMainUpdatePartialReducerMetadataRequestAction
  | StateMainUpdatePartialReducerMetadataSuccessAction
  | StateMainUpdatePartialReducerMetadataFailAction;
