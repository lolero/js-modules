import { values } from 'lodash';
import {
  NodeReservation,
  NodeReservationRaw,
  NodeReservationsReducer,
} from './nodeReservations.types';
import { getPkOfNodeReservation } from './nodeReservations.pkUtils';

export function normalizeNodeReservationsRawArray(
  nodeReservationsRaw: NodeReservationRaw[],
): NodeReservationsReducer['data'] {
  const normalizedNodeReservations: NodeReservationsReducer['data'] =
    nodeReservationsRaw.reduce(
      (
        normalizedNodeReservationsTemp: NodeReservationsReducer['data'],
        nodeReservationRaw,
      ) => {
        const nodeReservation: NodeReservation = {
          id: nodeReservationRaw.id,
          location: nodeReservationRaw.location,
          fromTimestamp: nodeReservationRaw.fromTimestamp,
          toTimestamp: nodeReservationRaw.toTimestamp,
          rating: nodeReservationRaw.rating,
          __edges__: {
            segway: [nodeReservationRaw.segwayId],
            user: [nodeReservationRaw.userId],
          },
        };

        return {
          ...normalizedNodeReservationsTemp,
          [getPkOfNodeReservation(nodeReservation)]: nodeReservation,
        };
      },
      {},
    );

  return normalizedNodeReservations;
}

export function denormalizeNodeReservations(
  nodeReservations: NodeReservationsReducer['data'],
): NodeReservationRaw[] {
  const denormalizedNodeReservationsArray = values(nodeReservations).map(
    (nodeReservation) => {
      const denormalizedNodeReservation: NodeReservationRaw = {
        id: nodeReservation.id,
        location: nodeReservation.location,
        fromTimestamp: nodeReservation.fromTimestamp,
        toTimestamp: nodeReservation.toTimestamp,
        segwayId: nodeReservation.__edges__.segway[0],
        userId: nodeReservation.__edges__.user[0],
        rating: nodeReservation.rating,
      };

      return denormalizedNodeReservation;
    },
  );

  return denormalizedNodeReservationsArray;
}
