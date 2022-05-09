import { values } from 'lodash';
import {
  NodeSegway,
  NodeSegwayRaw,
  NodeSegwaysReducer,
} from './nodeSegways.types';
import { getPkOfNodeSegway } from './nodeSegways.pkUtils';

export function normalizeNodeSegwaysRawArray(
  nodeSegwaysRaw: NodeSegwayRaw[],
): NodeSegwaysReducer['data'] {
  const normalizedNodeSegways: NodeSegwaysReducer['data'] =
    nodeSegwaysRaw.reduce(
      (
        normalizedNodeSegwaysTemp: NodeSegwaysReducer['data'],
        nodeSegwayRaw,
      ) => {
        const nodeSegway: NodeSegway = {
          id: nodeSegwayRaw.id,
          model: nodeSegwayRaw.model,
          color: nodeSegwayRaw.color,
          location: nodeSegwayRaw.location,
          reservedDays: [],
          __edges__: {
            reservations: [],
          },
        };

        return {
          ...normalizedNodeSegwaysTemp,
          [getPkOfNodeSegway(nodeSegway)]: nodeSegway,
        };
      },
      {},
    );

  return normalizedNodeSegways;
}

export function denormalizeNodeSegways(
  nodeSegways: NodeSegwaysReducer['data'],
): NodeSegwayRaw[] {
  const denormalizedNodeSegwaysArray = values(nodeSegways).map((nodeSegway) => {
    const denormalizedNodeSegway: NodeSegwayRaw = {
      id: nodeSegway.id,
      model: nodeSegway.model,
      color: nodeSegway.color,
      location: nodeSegway.location,
    };

    return denormalizedNodeSegway;
  });

  return denormalizedNodeSegwaysArray;
}
