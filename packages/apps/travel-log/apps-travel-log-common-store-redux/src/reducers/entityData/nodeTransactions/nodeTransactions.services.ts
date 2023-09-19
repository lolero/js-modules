import { axiosRequest } from '@js-modules/common-utils-general';
import {
  API_CORE_URI_TRAVEL_LOG,
  ApiControllersTravelLog,
  ApiSubHandlersTransactions,
} from '@js-modules/apps-travel-log-common-constants';
import { destructNodeTransactionPk } from './nodeTransactions.pkUtils';
import {
  NodeTransactionsGetManyServiceResponse,
  NodeTransactionsGetOneServiceResponse,
} from './nodeTransactions.servicesTypes';

export async function nodeTransactionsGetManyService(): Promise<NodeTransactionsGetManyServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.transactions}`,
  );
  return res;
}

export async function nodeTransactionsGetOneService(
  nodeTransactionPk: string,
): Promise<NodeTransactionsGetOneServiceResponse> {
  const userId = destructNodeTransactionPk(nodeTransactionPk).fields.uid;
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.transactions}/${ApiSubHandlersTransactions.testPath}/${userId}`,
  );
  return res;
}
