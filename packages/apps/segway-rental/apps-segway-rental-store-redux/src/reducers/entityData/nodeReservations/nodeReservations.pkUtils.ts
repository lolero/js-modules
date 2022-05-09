import { createReducerPkUtils } from 'normalized-reducers-utils';
import {
  NodeReservation,
  nodeReservationsPkSchema,
} from './nodeReservations.types';

export const {
  getPkOfEntity: getPkOfNodeReservation,
  destructPk: destructNodeReservationPk,
} = createReducerPkUtils<NodeReservation, typeof nodeReservationsPkSchema>(
  nodeReservationsPkSchema,
);
