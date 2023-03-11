import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
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
