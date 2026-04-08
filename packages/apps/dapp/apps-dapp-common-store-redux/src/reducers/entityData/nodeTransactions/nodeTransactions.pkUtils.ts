import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import type { NodeTransaction } from './nodeTransactions.types';
import { nodeTransactionsPkSchema } from './nodeTransactions.types';

export const {
  getPkOfEntity: getPkOfNodeTransaction,
  destructPk: destructNodeTransactionPk,
} = createReducerPkUtils<NodeTransaction, typeof nodeTransactionsPkSchema>(
  nodeTransactionsPkSchema,
);
