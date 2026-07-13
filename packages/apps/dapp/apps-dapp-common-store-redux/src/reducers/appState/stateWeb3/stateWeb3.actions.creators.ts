import { v4 as uuidv4 } from 'uuid';
import type {
  StateWeb3UpdatePartialReducerMetadataFailAction,
  StateWeb3UpdatePartialReducerMetadataRequestAction,
  StateWeb3UpdatePartialReducerMetadataSuccessAction,
  StateWeb3WalletConnectFailAction,
  StateWeb3WalletConnectRequestAction,
  StateWeb3WalletConnectSuccessAction,
  StateWeb3WalletDisconnectFailAction,
  StateWeb3WalletDisconnectRequestAction,
  StateWeb3WalletDisconnectSuccessAction,
} from './stateWeb3.actions.types';
import { StateWeb3ActionTypes } from './stateWeb3.actions.types';

export function createStateWeb3UpdatePartialReducerMetadataRequestAction(
  partialReducerMetadata: StateWeb3UpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): StateWeb3UpdatePartialReducerMetadataRequestAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    requestMetadata: {
      partialReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createStateWeb3UpdatePartialReducerMetadataSuccessAction(
  partialReducerMetadata: StateWeb3UpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: StateWeb3UpdatePartialReducerMetadataSuccessAction['requestId'],
): StateWeb3UpdatePartialReducerMetadataSuccessAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata,
    requestId,
  };
}

export function createStateWeb3UpdatePartialReducerMetadataFailAction(
  error: StateWeb3UpdatePartialReducerMetadataFailAction['error'],
  requestId: StateWeb3UpdatePartialReducerMetadataFailAction['requestId'],
): StateWeb3UpdatePartialReducerMetadataFailAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__FAIL,
    error,
    requestId,
  };
}

export const STATE_WEB3__WALLET_CONNECT__REQUEST_ID =
  'STATE_WEB3__WALLET_CONNECT__REQUEST_ID';
export function createStateWeb3WalletConnectRequestAction(
  walletType: StateWeb3WalletConnectRequestAction['requestMetadata']['walletType'],
): StateWeb3WalletConnectRequestAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__REQUEST,
    requestMetadata: {
      walletType,
    },
    requestId: STATE_WEB3__WALLET_CONNECT__REQUEST_ID,
  };
}

export function createStateWeb3WalletConnectSuccessAction(
  partialReducerMetadata: StateWeb3WalletConnectSuccessAction['partialReducerMetadata'],
  requestId: StateWeb3WalletConnectSuccessAction['requestId'],
): StateWeb3WalletConnectSuccessAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__SUCCESS,
    partialReducerMetadata,
    requestId,
  };
}

export function createStateWeb3WalletConnectFailAction(
  error: StateWeb3WalletConnectFailAction['error'],
  requestId: StateWeb3WalletConnectFailAction['requestId'],
): StateWeb3WalletConnectFailAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__FAIL,
    error,
    requestId,
  };
}

export const STATE_WEB3__WALLET_DISCONNECT__REQUEST_ID =
  'STATE_WEB3__WALLET_DISCONNECT__REQUEST_ID';
export function createStateWeb3WalletDisconnectRequestAction(): StateWeb3WalletDisconnectRequestAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__REQUEST,
    requestMetadata: {},
    requestId: STATE_WEB3__WALLET_DISCONNECT__REQUEST_ID,
  };
}

export function createStateWeb3WalletDisconnectSuccessAction(
  requestId: StateWeb3WalletDisconnectSuccessAction['requestId'],
): StateWeb3WalletDisconnectSuccessAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__SUCCESS,
    partialReducerMetadata: {
      wallet: null,
    },
    requestId,
  };
}

export function createStateWeb3WalletDisconnectFailAction(
  error: StateWeb3WalletDisconnectFailAction['error'],
  requestId: StateWeb3WalletDisconnectFailAction['requestId'],
): StateWeb3WalletDisconnectFailAction {
  return {
    type: StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__FAIL,
    error,
    requestId,
  };
}
