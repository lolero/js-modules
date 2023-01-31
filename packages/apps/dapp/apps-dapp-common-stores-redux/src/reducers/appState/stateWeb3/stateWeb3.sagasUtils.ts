import { eventChannel, EventChannel } from 'redux-saga';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { noop } from 'lodash';

export type NetworkConnectionMetadata = {
  isConnected: boolean;
  error?: Error;
};

export function createNetworkConnectionMetadataChannel(
  metamaskProvider: MetaMaskInpageProvider,
): EventChannel<NetworkConnectionMetadata> {
  const networkConnectionChannel = eventChannel(
    (emit: (input: NetworkConnectionMetadata) => void) => {
      metamaskProvider.on('connect', () => {
        emit({
          isConnected: true,
        });
      });
      metamaskProvider.on('disconnect', (error) => {
        emit({
          isConnected: false,
          error: error as Error,
        });
      });
      metamaskProvider.on('chainChanged', () => {
        emit({
          isConnected: metamaskProvider.isConnected(),
        });
      });

      return noop;
    },
  );

  return networkConnectionChannel;
}

export function createWalletAccountChannel(
  metamaskProvider: MetaMaskInpageProvider,
): EventChannel<string> {
  const onWalletDisconnectChannel = eventChannel(
    (emit: (input: string) => void) => {
      metamaskProvider.on('accountsChanged', (accountsNoType) => {
        const accounts = accountsNoType as string[];
        const account = accounts.length > 0 ? accounts[0] : '';
        emit(account);
      });

      return noop;
    },
  );

  return onWalletDisconnectChannel;
}
