import {
  FailAction,
  RequestAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateMainReducer } from './stateMain.types';

export enum StateMainActionTypes {
  STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST = 'STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS = 'STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL = 'STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
}

export type StateMainUpdatePartialReducerMetadataRequestAction = RequestAction<
  StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateMainReducer['metadata']>
>;

export type StateMainUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateMainReducer['metadata']
  >;

export type StateMainUpdatePartialReducerMetadataFailAction =
  FailAction<StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL>;

export type StateMainReducerHittingAction =
  | StateMainUpdatePartialReducerMetadataRequestAction
  | StateMainUpdatePartialReducerMetadataSuccessAction
  | StateMainUpdatePartialReducerMetadataFailAction;
