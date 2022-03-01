import { createInitialState, Entity } from 'normalized-reducers-utils';
import { StateWeb3Reducer } from './stateWeb3.types';

const stateWeb3ReducerMetadataInitialState: StateWeb3Reducer['metadata'] = {
  metamaskProvider: null,
  web3Provider: null,
  isConnectedToNetwork: false,
  wallet: null,
};

const stateWeb3ReducerDataInitialState: StateWeb3Reducer['data'] = {};

export const stateWeb3InitialState = createInitialState<
  typeof stateWeb3ReducerMetadataInitialState,
  Entity
>(stateWeb3ReducerMetadataInitialState, stateWeb3ReducerDataInitialState);
