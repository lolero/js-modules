import {
  createReducerSelectors,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateDialogsReducer } from './stateDialogs.types';
import { ReduxState } from '../../reducers.types';
import { stateDialogsReducerPath } from './stateDialogs.reducerPath';

export const stateDialogsSelectors = createReducerSelectors<
  StateDialogsReducer['metadata'],
  Entity,
  typeof stateDialogsReducerPath,
  ReduxState
>(stateDialogsReducerPath);

export const {
  selectRequests: selectStateDialogsRequests,
  selectMetadata: selectStateDialogsMetadata,
  selectConfig: selectStateDialogsConfig,
} = stateDialogsSelectors;
