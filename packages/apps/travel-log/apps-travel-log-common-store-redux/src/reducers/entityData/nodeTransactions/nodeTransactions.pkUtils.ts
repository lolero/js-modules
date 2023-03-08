import { createReducerPkUtils } from 'normalized-reducers-utils';
import {
  NodeTransaction,
  nodeTransactionsPkSchema,
} from './nodeTransactions.types';

export const {
  getPkOfEntity: getPkOfNodeTransaction,
  destructPk: destructNodeTransactionPk,
} = createReducerPkUtils<NodeTransaction, typeof nodeTransactionsPkSchema>(
  nodeTransactionsPkSchema,
);
