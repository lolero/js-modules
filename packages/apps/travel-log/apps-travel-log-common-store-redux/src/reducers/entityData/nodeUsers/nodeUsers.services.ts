import { axiosRequest } from '@js-modules/common-utils-general';
import {
  API_CORE_URI_TRAVEL_LOG,
  ApiControllersTravelLog,
} from '@js-modules/apps-travel-log-common-constants';
import {
  NodeUsersGetManyServiceResponse,
  NodeUsersGetOneServiceResponse,
} from './nodeUsers.services.types';
import { NodeUsersGetOneRequestAction } from './nodeUsers.actions.types';

export async function nodeUsersGetOneService(
  uniqueKeyValue: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  uniqueKeyName: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyName'],
): Promise<NodeUsersGetOneServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPublic}/${uniqueKeyValue}?uniqueKeyName=${uniqueKeyName}`,
  );
  return res;
}

export async function nodeUsersGetManyService(): Promise<NodeUsersGetManyServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPublic}`,
  );
  return res;
}
