import { getPkOfNodeTransaction } from './nodeTransactions.pkUtils';
import type {
  NodeTransaction,
  NodeTransactionRaw,
  NodeTransactionsReducer,
} from './nodeTransactions.types';

export function normalizeNodeTransactionsRawArray(
  nodeTransactionsRaw: NodeTransactionRaw[],
): NodeTransactionsReducer['data'] {
  const normalizedNodeTransactions: NodeTransactionsReducer['data'] =
    nodeTransactionsRaw.reduce(
      (
        normalizedNodeTransactionsTemp: NodeTransactionsReducer['data'],
        nodeTransactionRaw,
      ) => {
        const nodeTransaction: NodeTransaction = {
          uid: nodeTransactionRaw.uid,
        };

        return {
          ...normalizedNodeTransactionsTemp,
          [getPkOfNodeTransaction(nodeTransaction)]: nodeTransaction,
        };
      },
      {},
    );

  return normalizedNodeTransactions;
}
