import { axiosRequest } from '@dapp-example/common-utils-general';
import { destructNodeTransactionPk } from './nodeTransactions.pkUtils';
import {
  NodeTransactionsGetManyServiceResponse,
  NodeTransactionsGetOneServiceResponse,
} from './nodeTransactions.servicesTypes';
import { BASE_URL } from '../../../constants/apiConstants';

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
