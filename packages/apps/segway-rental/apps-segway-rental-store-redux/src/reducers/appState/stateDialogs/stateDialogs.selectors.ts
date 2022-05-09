import { createReducerSelectors, Entity } from 'normalized-reducers-utils';
import { StateDialogsReducer } from './stateDialogs.types';
import { ReduxState } from '../../reducers.types';
import stateDialogsReducerPath from './stateDialogs.reducerPath';

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
