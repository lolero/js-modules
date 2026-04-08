import detectEthereumProvider from '@metamask/detect-provider';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import { BrowserProvider } from 'ethers';
import type { SagaGenerator } from 'typed-redux-saga';
import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'typed-redux-saga';
import {
  createStateWeb3UpdatePartialReducerMetadataFailAction,
  createStateWeb3UpdatePartialReducerMetadataSuccessAction,
  createStateWeb3WalletConnectFailAction,
  createStateWeb3WalletConnectSuccessAction,
  createStateWeb3WalletDisconnectSuccessAction,
} from './stateWeb3.actions.creators';
import type {
  StateWeb3UpdatePartialReducerMetadataRequestAction,
  StateWeb3WalletConnectRequestAction,
} from './stateWeb3.actions.types';
import { StateWeb3ActionTypes } from './stateWeb3.actions.types';
import {
  createNetworkConnectionMetadataChannel,
  createWalletAccountChannel,
} from './stateWeb3.sagas.utils';
import { selectStateWeb3Metadata } from './stateWeb3.selectors';
import type { StateWeb3Reducer } from './stateWeb3.types';
import { WalletType } from './stateWeb3.types';

export function* stateWeb3NetworkConnectionSaga(): SagaGenerator<void> {
  const { metamaskProvider, web3Provider } = yield* select(
    selectStateWeb3Metadata,
  );

  if (!metamaskProvider || !web3Provider) {
    return;
  }

  const networkConnectionMetadataChannel =
    createNetworkConnectionMetadataChannel(metamaskProvider);

  while (true) {
    const networkConnectionMetadata = yield* take(
      networkConnectionMetadataChannel,
    );

    const network = yield* call([web3Provider, web3Provider.getNetwork]);

    yield* put(
      createStateWeb3UpdatePartialReducerMetadataSuccessAction(
        {
          network: {
            chainId: Number(network.chainId),
            isConnected: networkConnectionMetadata.isConnected,
          },
        },
        '',
      ),
    );
  }
}

export function* stateWeb3WalletConnectionSaga(): SagaGenerator<void> {
  const { metamaskProvider } = yield* select(selectStateWeb3Metadata);

  if (!metamaskProvider) {
    return;
  }

  const walletAccountChannel = createWalletAccountChannel(metamaskProvider);

  while (true) {
    const walletAccount = yield* take(walletAccountChannel);

    if (!walletAccount) {
      yield* put(createStateWeb3WalletDisconnectSuccessAction(''));
    }
  }
}

export function* stateWeb3InitSaga(): SagaGenerator<void> {
  const metamaskProvider = yield* call(
    detectEthereumProvider<MetaMaskInpageProvider>,
    {
      mustBeMetaMask: true,
    },
  );

  if (!metamaskProvider) {
    yield* put(
      createStateWeb3UpdatePartialReducerMetadataSuccessAction(
        {
          metamaskProvider: null,
        },
        '',
      ),
    );
    return;
  }

  const web3Provider = new BrowserProvider(metamaskProvider);
  const network = yield* call([web3Provider, web3Provider.getNetwork]);

  const partialStateWeb3ReducerMetadata: Partial<StateWeb3Reducer['metadata']> =
    {
      metamaskProvider,
      web3Provider,
      network: {
        chainId: Number(network.chainId),
        isConnected: metamaskProvider.isConnected(),
      },
    };

  if (metamaskProvider.selectedAddress) {
    partialStateWeb3ReducerMetadata.wallet = {
      walletType: WalletType.metamask,
      account: metamaskProvider.selectedAddress,
    };
  }

  yield* put(
    createStateWeb3UpdatePartialReducerMetadataSuccessAction(
      partialStateWeb3ReducerMetadata,

      '',
    ),
  );

  yield* all([
    fork(stateWeb3NetworkConnectionSaga),
    fork(stateWeb3WalletConnectionSaga),
  ]);
}

export function* stateWeb3UpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateWeb3UpdatePartialReducerMetadataRequestAction): SagaGenerator<void> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield* put(
      createStateWeb3UpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    yield* put(
      createStateWeb3UpdatePartialReducerMetadataFailAction(message, requestId),
    );
  }
}

export function* stateWeb3WalletConnectSaga({
  requestMetadata,
  requestId,
}: StateWeb3WalletConnectRequestAction): SagaGenerator<void> {
  try {
    const { metamaskProvider } = yield* select(selectStateWeb3Metadata);

    if (!metamaskProvider) {
      throw new Error('Metamask is not installed');
    }

    const { walletType } = requestMetadata;

    const accounts = (yield* call(
      [metamaskProvider, metamaskProvider.request],
      { method: 'eth_requestAccounts' },
    )) as string[];

    yield* put(
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    yield* put(createStateWeb3WalletConnectFailAction(message, requestId));
  }
}

export function* stateWeb3Sagas(): SagaGenerator<void> {
  yield* all([
    fork(stateWeb3InitSaga),
    takeEvery(
      StateWeb3ActionTypes.STATE_WEB3__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
      stateWeb3UpdatePartialReducerMetadataSaga,
    ),
    takeLatest(
      StateWeb3ActionTypes.STATE_WEB3__WALLET_CONNECT__REQUEST,
      stateWeb3WalletConnectSaga,
    ),
  ]);
}
