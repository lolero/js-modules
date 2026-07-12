import type {
  FailAction,
  RequestAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';
import type { StateWeb3Reducer, WalletType } from './stateWeb3.types';

export const StateWeb3ActionTypes = {
  STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
    'STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
    'STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
    'STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
  STATE_WEB3__WALLET_CONNECT__REQUEST: 'STATE_WEB3__WALLET_CONNECT__REQUEST',
  STATE_WEB3__WALLET_CONNECT__SUCCESS: 'STATE_WEB3__WALLET_CONNECT__SUCCESS',
  STATE_WEB3__WALLET_CONNECT__FAIL: 'STATE_WEB3__WALLET_CONNECT__FAIL',
  STATE_WEB3__WALLET_DISCONNECT__REQUEST:
    'STATE_WEB3__WALLET_DISCONNECT__REQUEST',
  STATE_WEB3__WALLET_DISCONNECT__SUCCESS:
    'STATE_WEB3__WALLET_DISCONNECT__SUCCESS',
  STATE_WEB3__WALLET_DISCONNECT__FAIL: 'STATE_WEB3__WALLET_DISCONNECT__FAIL',
} as const;
export type StateWeb3ActionTypes = Enum<typeof StateWeb3ActionTypes>;

export type StateWeb3UpdatePartialReducerMetadataRequestAction = RequestAction<
  typeof StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateWeb3Reducer['metadata']>
>;

export type StateWeb3UpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    StateWeb3Reducer['metadata']
  >;

export type StateWeb3UpdatePartialReducerMetadataFailAction = FailAction<
  typeof StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__FAIL
>;

export type StateWeb3WalletConnectRequestAction = RequestAction<
  typeof StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__REQUEST,
  {
    walletType: WalletType;
  }
>;

export type StateWeb3WalletConnectSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__SUCCESS,
    StateWeb3Reducer['metadata']
  >;

export type StateWeb3WalletConnectFailAction = FailAction<
  typeof StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__FAIL
>;

export type StateWeb3WalletDisconnectRequestAction = RequestAction<
  typeof StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__REQUEST,
  Record<string, never>
>;

export type StateWeb3WalletDisconnectSuccessAction =
  SavePartialReducerMetadataAction<
    typeof StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__SUCCESS,
    StateWeb3Reducer['metadata']
  >;

export type StateWeb3WalletDisconnectFailAction = FailAction<
  typeof StateWeb3ActionTypes.STATE_WEB3__WALLET_DISCONNECT__FAIL
>;

export type StateWeb3ReducerHittingAction =
  | StateWeb3UpdatePartialReducerMetadataRequestAction
  | StateWeb3UpdatePartialReducerMetadataSuccessAction
  | StateWeb3UpdatePartialReducerMetadataFailAction
  | StateWeb3WalletConnectRequestAction
  | StateWeb3WalletConnectSuccessAction
  | StateWeb3WalletConnectFailAction
  | StateWeb3WalletDisconnectRequestAction
  | StateWeb3WalletDisconnectSuccessAction
  | StateWeb3WalletDisconnectFailAction;
