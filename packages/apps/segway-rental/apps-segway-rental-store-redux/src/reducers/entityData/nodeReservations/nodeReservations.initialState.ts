import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
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
