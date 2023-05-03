import { axiosRequest } from '@js-modules/common-utils-general';
import { API_CORE_BASE_URI } from '@js-modules/apps-travel-log-common-constants';
import {
  NodeUsersGetManyServiceResponse,
  NodeUsersGetOneServiceResponse,
} from './nodeUsers.servicesTypes';
import { NodeUsersGetOneRequestAction } from './nodeUsers.actionsTypes';

export async function nodeUsersGetOneService(
  uniqueKeyValue: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  uniqueKeyName: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyName'],
): Promise<NodeUsersGetOneServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_BASE_URI}/users/${uniqueKeyValue}?uniqueKeyName=${uniqueKeyName}`,
  );
  return res;
}

export async function nodeUsersGetManyService(): Promise<NodeUsersGetManyServiceResponse> {
  const res = await axiosRequest.get(`${API_CORE_BASE_URI}/users`);
  return res;
}
