import {
  createInitialState,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateDialogsReducer } from './stateDialogs.types';

const stateDialogsReducerMetadataInitialState: StateDialogsReducer['metadata'] =
  {};

const stateDialogsReducerDataInitialState: StateDialogsReducer['data'] = {};

export const stateDialogsInitialState = createInitialState<
  typeof stateDialogsReducerMetadataInitialState,
  Entity
>(stateDialogsReducerMetadataInitialState, stateDialogsReducerDataInitialState);
