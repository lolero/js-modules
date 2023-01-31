import { AxiosResponse } from 'axios';
import { NodeTransactionRaw } from './nodeTransactions.types';

export interface NodeTransactionsGetManyServiceResponse extends AxiosResponse {
  data: NodeTransactionRaw[];
}

export interface NodeTransactionsGetOneServiceResponse extends AxiosResponse {
  data: NodeTransactionRaw;
}
