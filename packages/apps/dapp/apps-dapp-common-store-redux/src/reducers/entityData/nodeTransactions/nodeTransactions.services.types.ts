import { AxiosResponse } from 'axios';
import { NodeTransactionRaw } from './nodeTransactions.types';

export type NodeTransactionsGetManyServiceResponse = AxiosResponse<
  NodeTransactionRaw[]
>;

export type NodeTransactionsGetOneServiceResponse =
  AxiosResponse<NodeTransactionRaw>;
