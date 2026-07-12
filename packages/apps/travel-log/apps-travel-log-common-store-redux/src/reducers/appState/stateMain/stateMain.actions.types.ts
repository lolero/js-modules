import type {
  FailAction,
  RequestAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';
import type { StateMainReducer } from './stateMain.types';

export const StateMainActionTypes = {
  STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
    'STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
    'STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
    'STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
} as const;
export type StateMainActionTypes = Enum<typeof StateMainActionTypes>;

export type StateMainUpdatePartialReducerMetadataRequestAction = RequestAction<
  typeof StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateMainReducer['metadata']>
>;

export type StateMainUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateMainReducer['metadata']
  >;

export type StateMainUpdatePartialReducerMetadataFailAction = FailAction<
  typeof StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__FAIL
>;

export type StateMainReducerHittingAction =
  | StateMainUpdatePartialReducerMetadataRequestAction
  | StateMainUpdatePartialReducerMetadataSuccessAction
  | StateMainUpdatePartialReducerMetadataFailAction;
