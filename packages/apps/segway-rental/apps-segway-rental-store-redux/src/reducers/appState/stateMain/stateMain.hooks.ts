import { createReducerHooks } from 'normalized-reducers-utils';
import { stateMainSelectors } from './stateMain.selectors';

export const stateMainHooks = createReducerHooks(stateMainSelectors);

export const {
  useRequest: useStateMainRequest,
  useRequests: useStateMainRequests,
  useReducerMetadata: useStateMainReducerMetadata,
  useReducerConfig: useStateMainReducerConfig,
} = stateMainHooks;
