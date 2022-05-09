import { createReducerHooks } from 'normalized-reducers-utils';
import { stateDialogsSelectors } from './stateDialogs.selectors';

export const stateDialogsHooks = createReducerHooks(stateDialogsSelectors);

export const {
  useRequest: useStateDialogsRequest,
  useRequests: useStateDialogsRequests,
  useReducerMetadata: useStateDialogsReducerMetadata,
  useReducerConfig: useStateDialogsReducerConfig,
} = stateDialogsHooks;
