import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { stateWeb3Selectors } from './stateWeb3.selectors';

export const stateWeb3Hooks = createReducerHooks(stateWeb3Selectors);

export const {
  useRequest: useStateWeb3Request,
  useRequests: useStateWeb3Requests,
  useReducerMetadata: useStateWeb3ReducerMetadata,
  useReducerConfig: useStateWeb3ReducerConfig,
} = stateWeb3Hooks;
