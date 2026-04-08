import type { AxiosResponse } from 'axios';
import type { NodeTransactionRaw } from './nodeTransactions.types';

export type NodeTransactionsGetManyServiceResponse = AxiosResponse<
  NodeTransactionRaw[]
>;

export type NodeTransactionsGetOneServiceResponse =
  AxiosResponse<NodeTransactionRaw>;
