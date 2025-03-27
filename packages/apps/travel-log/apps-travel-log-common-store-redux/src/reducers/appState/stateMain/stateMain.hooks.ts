import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { stateMainSelectors } from './stateMain.selectors';

export const stateMainHooks = createReducerHooks(stateMainSelectors);

export const {
  useRequest: useStateMainRequest,
  useRequests: useStateMainRequests,
  useReducerMetadata: useStateMainReducerMetadata,
  useReducerConfig: useStateMainReducerConfig,
} = stateMainHooks;
