import {
  FailAction,
  RequestAction,
  SavePartialReducerMetadataAction,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateWeb3Reducer, WalletType } from './stateWeb3.types';

export enum StateWeb3ActionTypes {
  STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST = 'STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST',
  STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS = 'STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS',
  STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_FAIL = 'STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_FAIL',
  STATE_WEB3_WALLET_CONNECT_REQUEST = 'STATE_WEB3_WALLET_CONNECT_REQUEST',
  STATE_WEB3_WALLET_CONNECT_SUCCESS = 'STATE_WEB3_WALLET_CONNECT_SUCCESS',
  STATE_WEB3_WALLET_CONNECT_FAIL = 'STATE_WEB3_WALLET_CONNECT_FAIL',
  STATE_WEB3_WALLET_DISCONNECT_REQUEST = 'STATE_WEB3_WALLET_DISCONNECT_REQUEST',
  STATE_WEB3_WALLET_DISCONNECT_SUCCESS = 'STATE_WEB3_WALLET_DISCONNECT_SUCCESS',
  STATE_WEB3_WALLET_DISCONNECT_FAIL = 'STATE_WEB3_WALLET_DISCONNECT_FAIL',
}

export type StateWeb3UpdatePartialReducerMetadataRequestAction = RequestAction<
  StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
  UpdatePartialReducerMetadataRequestMetadata<StateWeb3Reducer['metadata']>
>;

export type StateWeb3UpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_SUCCESS,
    StateWeb3Reducer['metadata']
  >;

export type StateWeb3UpdatePartialReducerMetadataFailAction =
  FailAction<StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_FAIL>;

export type StateWeb3WalletConnectRequestAction = RequestAction<
  StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_REQUEST,
  {
    walletType: WalletType;
  }
>;

export type StateWeb3WalletConnectSuccessAction =
  SavePartialReducerMetadataAction<
    StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_SUCCESS,
    StateWeb3Reducer['metadata']
  >;

export type StateWeb3WalletConnectFailAction =
  FailAction<StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_FAIL>;

export type StateWeb3WalletDisconnectRequestAction = RequestAction<
  StateWeb3ActionTypes.STATE_WEB3_WALLET_DISCONNECT_REQUEST,
  Record<string, never>
>;

export type StateWeb3WalletDisconnectSuccessAction =
  SavePartialReducerMetadataAction<
    StateWeb3ActionTypes.STATE_WEB3_WALLET_DISCONNECT_SUCCESS,
    StateWeb3Reducer['metadata']
  >;

export type StateWeb3WalletDisconnectFailAction =
  FailAction<StateWeb3ActionTypes.STATE_WEB3_WALLET_DISCONNECT_FAIL>;

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
