import {
  all,
  AllEffect,
  ChannelTakeEffect,
  fork,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Maybe } from '@metamask/providers/dist/utils';
import {
  StateWeb3ActionTypes,
  StateWeb3UpdatePartialReducerMetadataRequestAction,
  StateWeb3WalletConnectRequestAction,
} from './stateWeb3.actionsTypes';
import {
  createStateWeb3UpdatePartialReducerMetadataFailAction,
  createStateWeb3UpdatePartialReducerMetadataSuccessAction,
  createStateWeb3WalletConnectFailAction,
  createStateWeb3WalletConnectSuccessAction,
  createStateWeb3WalletDisconnectSuccessAction,
} from './stateWeb3.actionsCreators';
import {
  createNetworkConnectionMetadataChannel,
  createWalletAccountChannel,
  NetworkConnectionMetadata,
} from './stateWeb3.sagasUtils';
import { StateWeb3Reducer, WalletType } from './stateWeb3.types';
import { selectStateWeb3Metadata } from './stateWeb3.selectors';

export function* stateWeb3NetworkConnectionSaga(): Generator<
  | SelectEffect
  | ChannelTakeEffect<NetworkConnectionMetadata>
  | Promise<ethers.providers.Network>
  | PutEffect,
  void,
  | StateWeb3Reducer['metadata']
  | NetworkConnectionMetadata
  | ethers.providers.Network
> {
  const { metamaskProvider, web3Provider } = (yield select(
    selectStateWeb3Metadata,
  )) as StateWeb3Reducer['metadata'];

  if (!metamaskProvider || !web3Provider) {
    return;
  }

  const networkConnectionMetadataChannel =
    createNetworkConnectionMetadataChannel(metamaskProvider);

  while (true) {
    const networkConnectionMetadata = (yield take(
      networkConnectionMetadataChannel,
    )) as NetworkConnectionMetadata;

    const network =
      (yield web3Provider.getNetwork()) as ethers.providers.Network;

    yield put(
      createStateWeb3UpdatePartialReducerMetadataSuccessAction(
        {
          network: {
            isConnected: networkConnectionMetadata.isConnected,
            chainId: network.chainId,
          },
        },
        '',
      ),
    );
  }
}

export function* stateWeb3WalletConnectionSaga(): Generator<
  SelectEffect | ChannelTakeEffect<string> | PutEffect,
  void,
  StateWeb3Reducer['metadata'] | string
> {
  const { metamaskProvider } = (yield select(
    selectStateWeb3Metadata,
  )) as StateWeb3Reducer['metadata'];

  if (!metamaskProvider) {
    return;
  }

  const walletAccountChannel = createWalletAccountChannel(metamaskProvider);

  while (true) {
    const walletAccount = (yield take(walletAccountChannel)) as string;

    if (!walletAccount) {
      yield put(createStateWeb3WalletDisconnectSuccessAction(''));
    }
  }
}

export function* stateWeb3InitSaga(): Generator<
  | Promise<unknown>
  | ChannelTakeEffect<MetaMaskInpageProvider>
  | Promise<ethers.providers.Network>
  | PutEffect
  | AllEffect<ForkEffect>,
  void,
  MetaMaskInpageProvider | ethers.providers.Network
> {
  const metamaskProvider = (yield detectEthereumProvider({
    mustBeMetaMask: true,
  })) as MetaMaskInpageProvider | null;

  if (!metamaskProvider) {
    yield put(
      createStateWeb3UpdatePartialReducerMetadataSuccessAction(
        {
          metamaskProvider: null,
        },
        '',
      ),
    );
    return;
  }

  const web3Provider = new ethers.providers.Web3Provider(
    metamaskProvider as unknown as ethers.providers.ExternalProvider,
  );
  const network = (yield web3Provider.getNetwork()) as ethers.providers.Network;

  const partialStateWeb3ReducerMetadata: Partial<StateWeb3Reducer['metadata']> =
    {
      metamaskProvider,
      web3Provider,
      network: {
        chainId: network.chainId,
        isConnected: metamaskProvider.isConnected(),
      },
    };

  if (metamaskProvider.selectedAddress) {
    partialStateWeb3ReducerMetadata.wallet = {
      walletType: WalletType.metamask,
      account: metamaskProvider.selectedAddress,
    };
  }

  yield put(
    createStateWeb3UpdatePartialReducerMetadataSuccessAction(
      partialStateWeb3ReducerMetadata,
      '',
    ),
  );

  yield all([
    fork(stateWeb3NetworkConnectionSaga),
    fork(stateWeb3WalletConnectionSaga),
  ]);
}

export function* stateWeb3UpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateWeb3UpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createStateWeb3UpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateWeb3UpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateWeb3WalletConnectSaga({
  requestMetadata,
  requestId,
}: StateWeb3WalletConnectRequestAction): Generator<
  SelectEffect | Promise<Maybe<unknown>> | PutEffect,
  void,
  StateWeb3Reducer['metadata'] | string[]
> {
  try {
    const { metamaskProvider } = (yield select(
      selectStateWeb3Metadata,
    )) as StateWeb3Reducer['metadata'];

    if (!metamaskProvider) {
      throw new Error('Metamask is not installed');
    }

    const { walletType } = requestMetadata;

    const accounts = (yield metamaskProvider.request({
      method: 'eth_requestAccounts',
    })) as string[];

    yield put(
      createStateWeb3WalletConnectSuccessAction(
        {
          wallet: {
            walletType,
            account: accounts[0],
          },
        },
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateWeb3WalletConnectFailAction(err.message, requestId));
  }
}

export function* stateWeb3Sagas(): Generator<ForkEffect, void, void> {
  yield fork(stateWeb3InitSaga);
  yield takeEvery(
    StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    stateWeb3UpdatePartialReducerMetadataSaga,
  );
  yield takeLatest(
    StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_REQUEST,
    stateWeb3WalletConnectSaga,
  );
}
