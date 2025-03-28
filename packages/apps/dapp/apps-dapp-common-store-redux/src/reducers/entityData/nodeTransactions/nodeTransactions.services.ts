import { axiosRequest } from '@js-modules/common-utils-general';
import { destructNodeTransactionPk } from './nodeTransactions.pkUtils';
import {
  NodeTransactionsGetManyServiceResponse,
  NodeTransactionsGetOneServiceResponse,
} from './nodeTransactions.services.types';

const BASE_URL = 'test';
export async function nodeTransactionsGetManyService(): Promise<NodeTransactionsGetManyServiceResponse> {
  const res = await axiosRequest.get(`${BASE_URL}/transactions`);
  return res;
}

export async function nodeTransactionsGetOneService(
  nodeTransactionPk: string,
): Promise<NodeTransactionsGetOneServiceResponse> {
  const userId = destructNodeTransactionPk(nodeTransactionPk).fields.uid;
  const res = await axiosRequest.get(`${BASE_URL}/transactions/${userId}`);
  return res;
}
