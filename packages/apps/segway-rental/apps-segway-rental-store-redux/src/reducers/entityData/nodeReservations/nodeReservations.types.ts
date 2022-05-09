import {
  Entity,
  PkSchema,
  Reducer,
  ReducerEdges,
  ReducerMetadata,
} from 'normalized-reducers-utils';
import nodeUsersReducerPath from '../nodeUsers/nodeUsers.reducerPath';
import nodeSegwaysReducerPath from '../nodeSegways/nodeSegways.reducerPath';

export type NodeReservationRaw = {
  id: string;
  location: string;
  fromTimestamp: string;
  toTimestamp: string;
  segwayId: string;
  userId: string;
  rating: number | null;
};

export interface NodeReservation extends Entity {
  id: string;
  location: string;
  fromTimestamp: string;
  toTimestamp: string;
  rating: number | null;
  __edges__: {
    segway: [string];
    user: [string];
  };
}

export const nodeReservationsPkSchema: PkSchema<NodeReservation, ['id'], []> = {
  fields: ['id'],
  edges: [],
  separator: '_node_reservations_sep_',
  subSeparator: '_node_reservations_sub_sep_',
};

type NodeReservationsReducerMetadata = ReducerMetadata;

export type NodeReservationsReducer = Reducer<
  NodeReservationsReducerMetadata,
  NodeReservation
>;

const nodeReservationsReducerEdgesWithoutTypes = {
  segway: {
    nodeReducerPath: nodeSegwaysReducerPath,
    edgeReducerPath: null,
  },
  user: {
    nodeReducerPath: nodeUsersReducerPath,
    edgeReducerPath: null,
  },
} as const;

export const nodeReservationsReducerEdges: ReducerEdges<
  NodeReservation,
  typeof nodeReservationsReducerEdgesWithoutTypes
> = nodeReservationsReducerEdgesWithoutTypes;

export type NodeReservationDisplay = {
  pk: string;
  model: string;
  color: string;
  location: string;
  fromTimestamp: string;
  toTimestamp: string;
  rating: number | null;
  reservedBy: string;
};
