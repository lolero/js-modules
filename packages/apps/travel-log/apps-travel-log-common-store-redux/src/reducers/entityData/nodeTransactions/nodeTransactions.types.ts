import {
  Entity,
  PkSchema,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export type NodeTransactionRaw = {
  uid: string;
};

export interface NodeTransaction extends Entity {
  uid: string;
}

export const nodeTransactionsPkSchema: PkSchema<NodeTransaction, ['uid'], []> =
  {
    fields: ['uid'],
    edges: [],
    separator: '_node_transactions_sep_',
    subSeparator: '_node_transactions_sub_sep_',
  };

type NodeTransactionsReducerMetadata = ReducerMetadata;

export type NodeTransactionsReducer = Reducer<
  NodeTransactionsReducerMetadata,
  NodeTransaction
>;
