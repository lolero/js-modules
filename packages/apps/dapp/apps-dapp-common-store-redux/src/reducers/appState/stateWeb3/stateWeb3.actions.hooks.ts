import { useCallback, useState } from 'react';
import {
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import {
  StateWeb3UpdatePartialReducerMetadataRequestAction,
  StateWeb3WalletConnectRequestAction,
  StateWeb3WalletDisconnectRequestAction,
} from './stateWeb3.actions.types';
import { StateWeb3Reducer } from './stateWeb3.types';
import {
  createStateWeb3UpdatePartialReducerMetadataRequestAction,
  createStateWeb3WalletConnectRequestAction,
  createStateWeb3WalletDisconnectRequestAction,
  STATE_WEB3__WALLET_CONNECT__REQUEST_ID,
  STATE_WEB3__WALLET_DISCONNECT__REQUEST_ID,
} from './stateWeb3.actions.creators';
import {
  useStateWeb3ReducerMetadata,
  useStateWeb3Request,
} from './stateWeb3.hooks';

export function useStateWeb3UpdatePartialReducerMetadata(): UseRequestReducerMetadata<
  StateWeb3UpdatePartialReducerMetadataRequestAction['requestMetadata'],
  StateWeb3Reducer['metadata'],
  (
    partialReducerMetadata: StateWeb3UpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useStateWeb3Request(requestId) as Request<
    StateWeb3UpdatePartialReducerMetadataRequestAction['requestMetadata']
  >;
  const reducerMetadata = useStateWeb3ReducerMetadata();

  const callback = useCallback(
    (
      partialReducerMetadata: StateWeb3UpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
    ) => {
      const action = createStateWeb3UpdatePartialReducerMetadataRequestAction(
        partialReducerMetadata,
      );
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch],
  );

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateWeb3WalletConnect(): UseRequestReducerMetadata<
  StateWeb3WalletConnectRequestAction['requestMetadata'],
  StateWeb3Reducer['metadata'],
  (
    walletType: StateWeb3WalletConnectRequestAction['requestMetadata']['walletType'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useStateWeb3Request(
    STATE_WEB3__WALLET_CONNECT__REQUEST_ID,
  ) as Request<StateWeb3WalletConnectRequestAction['requestMetadata']>;
  const reducerMetadata = useStateWeb3ReducerMetadata();

  const callback = useCallback(
    (
      walletType: StateWeb3WalletConnectRequestAction['requestMetadata']['walletType'],
    ) => {
      if (request?.isPending) {
        return;
      }

      const action = createStateWeb3WalletConnectRequestAction(walletType);
      dispatch(action);
    },
    [dispatch, request?.isPending],
  );

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateWeb3WalletDisconnect(): UseRequestReducerMetadata<
  StateWeb3WalletDisconnectRequestAction['requestMetadata'],
  StateWeb3Reducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const request = useStateWeb3Request(
    STATE_WEB3__WALLET_DISCONNECT__REQUEST_ID,
  ) as Request<StateWeb3WalletDisconnectRequestAction['requestMetadata']>;
  const reducerMetadata = useStateWeb3ReducerMetadata();

  const callback = useCallback(() => {
    if (request?.isPending) {
      return;
    }

    const action = createStateWeb3WalletDisconnectRequestAction();
    dispatch(action);
  }, [dispatch, request?.isPending]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}
