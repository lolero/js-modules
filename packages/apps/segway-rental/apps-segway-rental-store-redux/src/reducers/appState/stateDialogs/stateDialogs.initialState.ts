import { createInitialState, Entity } from 'normalized-reducers-utils';
import { StateDialogsReducer } from './stateDialogs.types';

const stateDialogsReducerMetadataInitialState: StateDialogsReducer['metadata'] =
  {};

const stateDialogsReducerDataInitialState: StateDialogsReducer['data'] = {};

export const stateDialogsInitialState = createInitialState<
  typeof stateDialogsReducerMetadataInitialState,
  Entity
>(stateDialogsReducerMetadataInitialState, stateDialogsReducerDataInitialState);
