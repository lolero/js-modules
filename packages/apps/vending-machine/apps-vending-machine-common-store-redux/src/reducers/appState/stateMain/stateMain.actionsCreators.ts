import { v4 as uuidv4 } from 'uuid';
import {
  StateMainActionTypes,
  StateMainDepositFailAction,
  StateMainDepositRequestAction,
  StateMainDepositSuccessAction,
  StateMainGetMyBalanceFailAction,
  StateMainGetMyBalanceRequestAction,
  StateMainGetMyBalanceSuccessAction,
  StateMainPurchaseFailAction,
  StateMainPurchaseRequestAction,
  StateMainPurchaseSuccessAction,
  StateMainResetFailAction,
  StateMainResetRequestAction,
  StateMainResetSuccessAction,
  StateMainUpdatePartialReducerMetadataFailAction,
  StateMainUpdatePartialReducerMetadataRequestAction,
  StateMainUpdatePartialReducerMetadataSuccessAction,
} from './stateMain.actionsTypes';

export function createStateMainUpdatePartialReducerMetadataRequestAction(
  partialStateMainReducerMetadata: StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): StateMainUpdatePartialReducerMetadataRequestAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
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
    type: StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata: partialStateMainReducerMetadata,
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

export function createStateMainGetMyBalanceRequestAction(): StateMainGetMyBalanceRequestAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createStateMainGetMyBalanceSuccessAction(
  partialStateMainReducerMetadata: StateMainUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateMainGetMyBalanceSuccessAction['requestId'],
  statusCode: StateMainGetMyBalanceSuccessAction['statusCode'],
): StateMainGetMyBalanceSuccessAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__SUCCESS,
    partialReducerMetadata: partialStateMainReducerMetadata,
    requestId,
    statusCode,
  };
}

export function createStateMainGetMyBalanceFailAction(
  error: StateMainGetMyBalanceFailAction['error'],
  requestId: StateMainGetMyBalanceFailAction['requestId'],
): StateMainGetMyBalanceFailAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__FAIL,
    error,
    requestId,
  };
}

export function createStateMainDepositRequestAction(
  amount: StateMainDepositRequestAction['requestMetadata']['amount'],
): StateMainDepositRequestAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__DEPOSIT__REQUEST,
    requestMetadata: {
      amount,
    },
    requestId: uuidv4(),
  };
}

export function createStateMainDepositSuccessAction(
  partialStateMainReducerMetadata: StateMainUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateMainDepositSuccessAction['requestId'],
  statusCode: StateMainDepositSuccessAction['statusCode'],
): StateMainDepositSuccessAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__DEPOSIT__SUCCESS,
    partialReducerMetadata: partialStateMainReducerMetadata,
    requestId,
    statusCode,
  };
}

export function createStateMainDepositFailAction(
  error: StateMainDepositFailAction['error'],
  requestId: StateMainDepositFailAction['requestId'],
): StateMainDepositFailAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__DEPOSIT__FAIL,
    error,
    requestId,
  };
}

export function createStateMainPurchaseRequestAction(): StateMainPurchaseRequestAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__PURCHASE__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createStateMainPurchaseSuccessAction(
  partialStateMainReducerMetadata: StateMainUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateMainPurchaseSuccessAction['requestId'],
  statusCode: StateMainPurchaseSuccessAction['statusCode'],
): StateMainPurchaseSuccessAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__PURCHASE__SUCCESS,
    partialReducerMetadata: partialStateMainReducerMetadata,
    requestId,
    statusCode,
  };
}

export function createStateMainPurchaseFailAction(
  error: StateMainPurchaseFailAction['error'],
  requestId: StateMainPurchaseFailAction['requestId'],
): StateMainPurchaseFailAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__PURCHASE__FAIL,
    error,
    requestId,
  };
}

export function createStateMainResetRequestAction(): StateMainResetRequestAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__RESET__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createStateMainResetSuccessAction(
  partialStateMainReducerMetadata: StateMainUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateMainResetSuccessAction['requestId'],
  statusCode: StateMainResetSuccessAction['statusCode'],
): StateMainResetSuccessAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__RESET__SUCCESS,
    partialReducerMetadata: partialStateMainReducerMetadata,
    requestId,
    statusCode,
  };
}

export function createStateMainResetFailAction(
  error: StateMainResetFailAction['error'],
  requestId: StateMainResetFailAction['requestId'],
): StateMainResetFailAction {
  return {
    type: StateMainActionTypes.STATE_MAIN__RESET__FAIL,
    error,
    requestId,
  };
}
