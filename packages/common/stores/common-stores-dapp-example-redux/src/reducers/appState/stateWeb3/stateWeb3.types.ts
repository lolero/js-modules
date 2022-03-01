import { Entity, Reducer, ReducerMetadata } from 'normalized-reducers-utils';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';

export enum WalletType {
  metamask = 'metamask',
}

export interface StateWeb3ReducerMetadata extends ReducerMetadata {
  metamaskProvider: MetaMaskInpageProvider | null;
  web3Provider: ethers.providers.Web3Provider | null;
  isConnectedToNetwork: boolean;
  wallet: {
    walletType: WalletType;
    network: ethers.providers.Network;
    accountAddress: string;
  } | null;
}

export type StateWeb3Reducer = Reducer<StateWeb3ReducerMetadata, Entity>;
