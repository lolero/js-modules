import { axiosRequest } from '@js-modules/common-utils-general';
import { destructNodeUserPk } from './nodeUsers.pkUtils';
import {
  NodeUsersDeleteOneServiceResponse,
  NodeUsersGetManyServiceResponse,
  NodeUsersGetOneServiceResponse,
  NodeUsersUpdateOneRoleServiceResponse,
} from './nodeUsers.servicesTypes';
import { BASE_URL } from '../../../constants/apiConstants';
import { UserRoles } from '../../appState/stateAuth/stateAuth.types';

export async function nodeUsersGetManyService(): Promise<NodeUsersGetManyServiceResponse> {
  const res = await axiosRequest.get(`${BASE_URL}/users`);
  return res;
}

export async function nodeUsersGetOneService(
  nodeUserPk: string,
): Promise<NodeUsersGetOneServiceResponse> {
  const userId = destructNodeUserPk(nodeUserPk).fields.uid;
  const res = await axiosRequest.get(`${BASE_URL}/users/${userId}`);
  return res;
}

export async function nodeUsersUpdateOneRoleService(
  nodeUserPk: string,
  role: UserRoles,
): Promise<NodeUsersUpdateOneRoleServiceResponse> {
  const userId = destructNodeUserPk(nodeUserPk).fields.uid;
  const res = await axiosRequest.patch(`${BASE_URL}/users/${userId}`, { role });
  return res;
}

export async function nodeUsersDeleteOneService(
  nodeUserPk: string,
): Promise<NodeUsersDeleteOneServiceResponse> {
  const userId = destructNodeUserPk(nodeUserPk).fields.uid;
  const res = await axiosRequest.delete(`${BASE_URL}/users/${userId}`);
  return res;
}
