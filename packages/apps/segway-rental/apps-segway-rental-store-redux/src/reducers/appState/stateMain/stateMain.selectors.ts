import {
  createReducerSelectors,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateMainReducer } from './stateMain.types';
import { ReduxState } from '../../reducers.types';
import stateMainReducerPath from './stateMain.reducerPath';

export const stateMainSelectors = createReducerSelectors<
  StateMainReducer['metadata'],
  Entity,
  typeof stateMainReducerPath,
  ReduxState
>(stateMainReducerPath);

export const {
  selectRequests: selectStateMainRequests,
  selectMetadata: selectStateMainMetadata,
  selectConfig: selectStateMainConfig,
} = stateMainSelectors;
