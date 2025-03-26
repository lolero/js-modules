import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { BrowserProvider } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';

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
