import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { stateAuthSelectors } from './stateAuth.selectors';

export const stateAuthHooks = createReducerHooks(stateAuthSelectors);

export const {
  useRequest: useStateAuthRequest,
  useRequests: useStateAuthRequests,
  useReducerMetadata: useStateAuthReducerMetadata,
  useReducerConfig: useStateAuthReducerConfig,
} = stateAuthHooks;
