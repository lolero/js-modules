import {
  all,
  AllEffect,
  cancel,
  CancelEffect,
  ChannelTakeEffect,
  fork,
  ForkEffect,
  put,
  PutEffect,
  race,
  RaceEffect,
  select,
  SelectEffect,
  take,
  TakeEffect,
  takeEvery,
} from 'redux-saga/effects';
import { Task } from 'redux-saga';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';
import {
  StateWeb3ActionTypes,
  StateWeb3WalletConnectRequestAction,
  StateWeb3UpdatePartialReducerMetadataRequestAction,
  StateWeb3WalletDisconnectRequestAction,
} from './stateWeb3.actionsTypes';
import {
  createStateWeb3UpdatePartialReducerMetadataFailAction,
  createStateWeb3UpdatePartialReducerMetadataSuccessAction,
  createStateWeb3WalletConnectFailAction,
  createStateWeb3WalletDisconnectSuccessAction,
} from './stateWeb3.actionsCreators';
import {
  createGetMetamaskProviderChannel,
  createIsNetworkConnectedChannel,
  createOnWalletDisconnectChannel,
} from './stateWeb3.sagasUtils';
import { StateWeb3Reducer, WalletType } from './stateWeb3.types';
import { selectStateWeb3Metadata } from './stateWeb3.selectors';

export function* stateWeb3NetworkConnectionSaga(): Generator<
  SelectEffect | ChannelTakeEffect<boolean> | PutEffect,
  void,
  StateWeb3Reducer['metadata'] | boolean
> {
  const stateWeb3ReducerMetadata = (yield select(
    selectStateWeb3Metadata,
  )) as StateWeb3Reducer['metadata'];
  const metamaskProvider =
    stateWeb3ReducerMetadata.metamaskProvider as MetaMaskInpageProvider;

  const isNetworkConnectedChannel =
    createIsNetworkConnectedChannel(metamaskProvider);

  while (true) {
    const isNetworkConnected = (yield take(
      isNetworkConnectedChannel,
    )) as boolean;

    yield put(
      createStateWeb3UpdatePartialReducerMetadataSuccessAction(
        {
          isConnectedToNetwork: isNetworkConnected,
        },
        '',
      ),
    );
  }
}

export function* stateWeb3ConnectToWalletSaga({
  requestMetadata,
  requestId,
}: StateWeb3WalletConnectRequestAction): Generator<
  SelectEffect | Promise<ethers.providers.Network> | PutEffect,
  void,
  StateWeb3Reducer['metadata'] | ethers.providers.Network
> {
  const { walletType } = requestMetadata;

  const stateWeb3ReducerMetadata = (yield select(
    selectStateWeb3Metadata,
  )) as StateWeb3Reducer['metadata'];
  const metamaskProvider =
    stateWeb3ReducerMetadata.metamaskProvider as MetaMaskInpageProvider;
  const web3Provider =
    stateWeb3ReducerMetadata.web3Provider as ethers.providers.Web3Provider;

  const network = (yield web3Provider.getNetwork()) as ethers.providers.Network;

  yield put(
    createStateWeb3UpdatePartialReducerMetadataSuccessAction(
      {
        walletType,
        network,
        accountAddress: metamaskProvider.selectedAddress,
      },
      requestId,
    ),
  );
}

export function* stateWeb3WalletConnectionSaga(): Generator<
  | SelectEffect
  | TakeEffect
  | ForkEffect
  | RaceEffect<TakeEffect | ChannelTakeEffect<true>>
  | AllEffect<PutEffect | CancelEffect>,
  void,
  | StateWeb3Reducer['metadata']
  | StateWeb3WalletConnectRequestAction
  | Task
  | {
      stateWeb3WalletDisconnectRequestAction?: StateWeb3WalletDisconnectRequestAction;
      isWalletDisconnected?: true;
    }
> {
  const stateWeb3ReducerMetadata = (yield select(
    selectStateWeb3Metadata,
  )) as StateWeb3Reducer['metadata'];
  const metamaskProvider =
    stateWeb3ReducerMetadata.metamaskProvider as MetaMaskInpageProvider;

  const onWalletDisconnectChannel =
    createOnWalletDisconnectChannel(metamaskProvider);

  while (true) {
    let walletConnectTask: Task | undefined;
    let stateWeb3WalletConnectRequestAction:
      | StateWeb3WalletConnectRequestAction
      | undefined;
    if (!metamaskProvider.selectedAddress) {
      stateWeb3WalletConnectRequestAction = (yield take(
        StateWeb3ActionTypes.STATE_WEB3_WALLET_CONNECT_REQUEST,
      )) as StateWeb3WalletConnectRequestAction;

      walletConnectTask = (yield fork(
        stateWeb3ConnectToWalletSaga,
        stateWeb3WalletConnectRequestAction,
      )) as Task;
    }

    const { stateWeb3WalletDisconnectRequestAction } = (yield race({
      stateWeb3WalletDisconnectRequestAction: take(
        StateWeb3ActionTypes.STATE_WEB3_WALLET_DISCONNECT_REQUEST,
      ),
      isWalletDisconnected: take(onWalletDisconnectChannel),
    })) as {
      stateWeb3WalletDisconnectRequestAction?: StateWeb3WalletDisconnectRequestAction;
      isWalletDisconnected?: true;
    };

    const effectArray: (CancelEffect | PutEffect)[] = [];

    if (
      walletConnectTask &&
      walletConnectTask.isRunning() &&
      stateWeb3WalletConnectRequestAction
    ) {
      effectArray.push(cancel(walletConnectTask));
      effectArray.push(
        put(
          createStateWeb3WalletConnectFailAction(
            `Connection interrupted by ${
              stateWeb3WalletDisconnectRequestAction
                ? 'a disconnect request'
                : 'Metamask'
            }`,
            stateWeb3WalletConnectRequestAction.requestId,
          ),
        ),
      );
    }

    effectArray.push(
      put(
        createStateWeb3WalletDisconnectSuccessAction(
          stateWeb3WalletDisconnectRequestAction
            ? stateWeb3WalletDisconnectRequestAction.requestId
            : '',
        ),
      ),
    );

    yield all(effectArray);
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
  let metamaskProvider = (yield detectEthereumProvider({
    mustBeMetaMask: true,
  })) as MetaMaskInpageProvider | null;

  if (!metamaskProvider) {
    const getMetamaskProviderChannel = createGetMetamaskProviderChannel();

    while (!metamaskProvider) {
      metamaskProvider = (yield take(
        getMetamaskProviderChannel,
      )) as MetaMaskInpageProvider;

      if (metamaskProvider) {
        getMetamaskProviderChannel.close();
      }
    }
  }

  const web3Provider = new ethers.providers.Web3Provider(
    metamaskProvider as unknown as ethers.providers.ExternalProvider,
  );

  const partialStateWeb3ReducerMetadata: Partial<StateWeb3Reducer['metadata']> =
    {
      metamaskProvider,
      web3Provider,
      isConnectedToNetwork: metamaskProvider.isConnected(),
    };

  if (metamaskProvider.selectedAddress) {
    const network =
      (yield web3Provider.getNetwork()) as ethers.providers.Network;
    partialStateWeb3ReducerMetadata.wallet = {
      walletType: WalletType.metamask,
      network,
      accountAddress: metamaskProvider.selectedAddress,
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

export function* stateWeb3Sagas(): Generator<ForkEffect, void, void> {
  // yield fork(stateWeb3InitSaga);
  yield takeEvery(
    StateWeb3ActionTypes.STATE_WEB3_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    stateWeb3UpdatePartialReducerMetadataSaga,
  );
}
