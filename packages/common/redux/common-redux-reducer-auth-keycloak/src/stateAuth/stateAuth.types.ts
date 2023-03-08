import { Entity, Reducer, ReducerMetadata } from 'normalized-reducers-utils';

interface StateAuthReducerMetadata extends ReducerMetadata {
  token: string | null;
}

export type StateAuthReducer = Reducer<StateAuthReducerMetadata, Entity>;
