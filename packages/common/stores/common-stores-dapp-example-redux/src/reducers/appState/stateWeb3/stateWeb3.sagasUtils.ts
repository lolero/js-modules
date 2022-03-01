import { eventChannel, EventChannel } from 'redux-saga';
import { MetaMaskInpageProvider } from '@metamask/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { noop } from 'lodash';

export function createGetMetamaskProviderChannel(): EventChannel<MetaMaskInpageProvider> {
  const getMetamaskProviderChannel = eventChannel(
    (emit: (input: MetaMaskInpageProvider) => void) => {
      const interval = setInterval(async () => {
        const metamaskProvider = (await detectEthereumProvider({
          mustBeMetaMask: true,
        })) as MetaMaskInpageProvider | null;

        if (metamaskProvider) {
          emit(metamaskProvider);
        }
      }, 2000);

      return () => clearInterval(interval);
    },
  );

  return getMetamaskProviderChannel;
}

export function createIsNetworkConnectedChannel(
  metamaskProvider: MetaMaskInpageProvider,
): EventChannel<boolean> {
  const isNetworkConnectedChannel = eventChannel(
    (emit: (input: boolean) => void) => {
      metamaskProvider.on('connect', (t) => {
        console.log('connect:', t);
        emit(true);
      });
      metamaskProvider.on('disconnect', (t) => {
        console.log('disconnect:', t);
        emit(false);
      });

      return noop;
    },
  );

  return isNetworkConnectedChannel;
}

export function createOnWalletDisconnectChannel(
  metamaskProvider: MetaMaskInpageProvider,
): EventChannel<true> {
  const onWalletDisconnectChannel = eventChannel(
    (emit: (input: true) => void) => {
      const interval = setInterval(async () => {
        if (!metamaskProvider.selectedAddress) {
          // emit(true);
        }
      }, 2000);

      return () => clearInterval(interval);
    },
  );

  return onWalletDisconnectChannel;
}
