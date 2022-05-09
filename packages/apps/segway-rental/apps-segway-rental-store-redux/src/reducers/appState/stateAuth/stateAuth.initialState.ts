import { createInitialState, Entity } from 'normalized-reducers-utils';
import { StateAuthReducer } from './stateAuth.types';

const stateAuthReducerMetadataInitialState: StateAuthReducer['metadata'] = {
  authUser: null,
  authUserRole: null,
  authError: null,
};

const stateAuthReducerDataInitialState: StateAuthReducer['data'] = {};

export const stateAuthInitialState = createInitialState<
  typeof stateAuthReducerMetadataInitialState,
  Entity
>(stateAuthReducerMetadataInitialState, stateAuthReducerDataInitialState);
