import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { BrowserProvider } from 'ethers';
import type {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export enum WalletType {
  metamask = 'metamask',
}

export interface StateWeb3ReducerMetadata extends ReducerMetadata {
  metamaskProvider?: MetaMaskInpageProvider | null;
  web3Provider?: BrowserProvider;
  network?: {
    chainId: number;
    isConnected: boolean;
  };
  wallet: {
    walletType: WalletType;
    account: string;
  } | null;
}

export type StateWeb3Reducer = Reducer<StateWeb3ReducerMetadata, Entity>;
