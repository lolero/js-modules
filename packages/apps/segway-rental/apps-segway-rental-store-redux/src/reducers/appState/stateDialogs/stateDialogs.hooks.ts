import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { stateDialogsSelectors } from './stateDialogs.selectors';

export const stateDialogsHooks = createReducerHooks(stateDialogsSelectors);

export const {
  useRequest: useStateDialogsRequest,
  useRequests: useStateDialogsRequests,
  useReducerMetadata: useStateDialogsReducerMetadata,
  useReducerConfig: useStateDialogsReducerConfig,
} = stateDialogsHooks;
