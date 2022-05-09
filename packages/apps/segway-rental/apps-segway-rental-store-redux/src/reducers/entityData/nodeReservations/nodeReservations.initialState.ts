import { createInitialState } from 'normalized-reducers-utils';
import {
  NodeReservation,
  NodeReservationsReducer,
} from './nodeReservations.types';

const nodeReservationsReducerMetadataInitialState: NodeReservationsReducer['metadata'] =
  {};

const nodeReservationsReducerDataInitialState: NodeReservationsReducer['data'] =
  {};

export const nodeReservationsInitialState = createInitialState<
  NodeReservationsReducer['metadata'],
  NodeReservation
>(
  nodeReservationsReducerMetadataInitialState,
  nodeReservationsReducerDataInitialState,
);
