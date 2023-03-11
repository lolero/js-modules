import {
  Entity,
  PkSchema,
  Reducer,
  ReducerEdges,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import nodeReservationsReducerPath from '../nodeReservations/nodeReservations.reducerPath';

export type NodeSegwayRaw = {
  id: string;
  model: string;
  color: string;
  location: string;
};

export interface NodeSegway extends Entity {
  id: string;
  model: string;
  color: string;
  location: string;
  reservedDays: string[];
  __edges__: {
    reservations: string[];
  };
}

export const nodeSegwaysPkSchema: PkSchema<NodeSegway, ['id'], []> = {
  fields: ['id'],
  edges: [],
  separator: '_node_segways_sep_',
  subSeparator: '_node_segways_sub_sep_',
};

type NodeSegwaysReducerMetadata = ReducerMetadata;

export type NodeSegwaysReducer = Reducer<
  NodeSegwaysReducerMetadata,
  NodeSegway
>;

const nodeSegwaysReducerEdgesWithoutTypes = {
  reservations: {
    nodeReducerPath: nodeReservationsReducerPath,
    edgeReducerPath: null,
  },
} as const;

export const nodeSegwaysReducerEdges: ReducerEdges<
  NodeSegway,
  typeof nodeSegwaysReducerEdgesWithoutTypes
> = nodeSegwaysReducerEdgesWithoutTypes;

export type NodeSegwayDisplay = {
  pk: string;
  isAvailable: boolean | null;
  model: string;
  color: string;
  location: string;
  rating: number | null;
  reservedDays: string[];
};
