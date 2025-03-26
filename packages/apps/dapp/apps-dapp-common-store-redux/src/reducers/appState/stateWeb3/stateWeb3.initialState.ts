import {
  createInitialState,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateWeb3Reducer } from './stateWeb3.types';
import {
  STATE_WEB3__WALLET_CONNECT__REQUEST_ID,
  STATE_WEB3__WALLET_DISCONNECT__REQUEST_ID,
} from './stateWeb3.actions.creators';

const stateWeb3ReducerMetadataInitialState: StateWeb3Reducer['metadata'] = {
  wallet: null,
};

const stateWeb3ReducerDataInitialState: StateWeb3Reducer['data'] = {};

export const stateWeb3InitialState = createInitialState<
  typeof stateWeb3ReducerMetadataInitialState,
  Entity
>(stateWeb3ReducerMetadataInitialState, stateWeb3ReducerDataInitialState, {
  protectedRequestIds: [
    STATE_WEB3__WALLET_CONNECT__REQUEST_ID,
    STATE_WEB3__WALLET_DISCONNECT__REQUEST_ID,
  ],
});
