import { AxiosResponse } from 'axios';
import { NodeUserRaw } from './nodeUsers.types';

export interface NodeUsersGetManyServiceResponse extends AxiosResponse {
  data: NodeUserRaw[];
}

export interface NodeUsersGetOneServiceResponse extends AxiosResponse {
  data: NodeUserRaw;
}

export interface NodeUsersCreateOneServiceResponse extends AxiosResponse {
  data: NodeUserRaw;
}

export interface NodeUsersUpdateOneRoleServiceResponse extends AxiosResponse {
  data: NodeUserRaw;
}

export type NodeUsersDeleteOneServiceResponse = AxiosResponse;
