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
  STATE_MAIN__GET_MY_BALANCE__REQUEST = 'STATE_MAIN__GET_MY_BALANCE__REQUEST',
  STATE_MAIN__GET_MY_BALANCE__SUCCESS = 'STATE_MAIN__GET_MY_BALANCE__SUCCESS',
  STATE_MAIN__GET_MY_BALANCE__FAIL = 'STATE_MAIN__GET_MY_BALANCE__FAIL',
  STATE_MAIN__DEPOSIT__REQUEST = 'STATE_MAIN__DEPOSIT__REQUEST',
  STATE_MAIN__DEPOSIT__SUCCESS = 'STATE_MAIN__DEPOSIT__SUCCESS',
  STATE_MAIN__DEPOSIT__FAIL = 'STATE_MAIN__DEPOSIT__FAIL',
  STATE_MAIN__PURCHASE__REQUEST = 'STATE_MAIN__PURCHASE__REQUEST',
  STATE_MAIN__PURCHASE__SUCCESS = 'STATE_MAIN__PURCHASE__SUCCESS',
  STATE_MAIN__PURCHASE__FAIL = 'STATE_MAIN__PURCHASE__FAIL',
  STATE_MAIN__RESET__REQUEST = 'STATE_MAIN__RESET__REQUEST',
  STATE_MAIN__RESET__SUCCESS = 'STATE_MAIN__RESET__SUCCESS',
  STATE_MAIN__RESET__FAIL = 'STATE_MAIN__RESET__FAIL',
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

export type StateMainGetMyBalanceRequestAction = RequestAction<
  StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__REQUEST,
  Record<string, never>
>;

export type StateMainGetMyBalanceSuccessAction =
  SavePartialReducerMetadataAction<
    StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__SUCCESS,
    StateMainReducer['metadata']
  >;

export type StateMainGetMyBalanceFailAction =
  FailAction<StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__FAIL>;

export type StateMainDepositRequestAction = RequestAction<
  StateMainActionTypes.STATE_MAIN__DEPOSIT__REQUEST,
  {
    amount: number;
  }
>;

export type StateMainDepositSuccessAction = SavePartialReducerMetadataAction<
  StateMainActionTypes.STATE_MAIN__DEPOSIT__SUCCESS,
  StateMainReducer['metadata']
>;

export type StateMainDepositFailAction =
  FailAction<StateMainActionTypes.STATE_MAIN__DEPOSIT__FAIL>;

export type StateMainPurchaseRequestAction = RequestAction<
  StateMainActionTypes.STATE_MAIN__PURCHASE__REQUEST,
  Record<string, never>
>;

export type StateMainPurchaseSuccessAction = SavePartialReducerMetadataAction<
  StateMainActionTypes.STATE_MAIN__PURCHASE__SUCCESS,
  StateMainReducer['metadata']
>;

export type StateMainPurchaseFailAction =
  FailAction<StateMainActionTypes.STATE_MAIN__PURCHASE__FAIL>;

export type StateMainResetRequestAction = RequestAction<
  StateMainActionTypes.STATE_MAIN__RESET__REQUEST,
  Record<string, never>
>;

export type StateMainResetSuccessAction = SavePartialReducerMetadataAction<
  StateMainActionTypes.STATE_MAIN__RESET__SUCCESS,
  StateMainReducer['metadata']
>;

export type StateMainResetFailAction =
  FailAction<StateMainActionTypes.STATE_MAIN__RESET__FAIL>;

export type StateMainReducerHittingAction =
  | StateMainUpdatePartialReducerMetadataRequestAction
  | StateMainUpdatePartialReducerMetadataSuccessAction
  | StateMainUpdatePartialReducerMetadataFailAction
  | StateMainGetMyBalanceRequestAction
  | StateMainGetMyBalanceSuccessAction
  | StateMainGetMyBalanceFailAction
  | StateMainDepositRequestAction
  | StateMainDepositSuccessAction
  | StateMainDepositFailAction
  | StateMainPurchaseRequestAction
  | StateMainPurchaseSuccessAction
  | StateMainPurchaseFailAction
  | StateMainResetRequestAction
  | StateMainResetSuccessAction
  | StateMainResetFailAction;
