import { axiosRequest } from '@js-modules/common-utils-general';
import {
  API_CORE_URI_TRAVEL_LOG,
  ApiControllersTravelLog,
} from '@js-modules/apps-travel-log-common-constants';
import {
  NodeFormsGetManyServiceResponse,
  NodeFormsGetOneServiceResponse,
} from './nodeForms.servicesTypes';
import { NodeFormsGetOneRequestAction } from './nodeForms.actionsTypes';

export async function nodeFormsGetOneService(
  uniqueKeyValue: NodeFormsGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  uniqueKeyName: NodeFormsGetOneRequestAction['requestMetadata']['uniqueKeyName'],
): Promise<NodeFormsGetOneServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPublic}/${uniqueKeyValue}?uniqueKeyName=${uniqueKeyName}`,
  );
  return res;
}

export async function nodeFormsGetManyService(): Promise<NodeFormsGetManyServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPublic}`,
  );
  return res;
}
