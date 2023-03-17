import {
  Entity,
  PkSchema,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export interface NodeProduct extends Entity {
  id: number;
  name: string;
  cost: number;
  amountAvailable: number;
  __edges__: {
    seller: [string];
  };
}

export const nodeProductsPkSchema: PkSchema<NodeProduct, ['id'], []> = {
  fields: ['id'],
  edges: [],
  separator: '_node_products_sep_',
  subSeparator: '_node_products_sub_sep_',
};

export interface NodeProductsReducerMetadata extends ReducerMetadata {
  nodeProductsGetManyRequestId: string | null;
}

export type NodeProductsReducer = Reducer<
  NodeProductsReducerMetadata,
  NodeProduct
>;
