import { AxiosResponse } from 'axios';
import { UsersPublicDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.public.dto';
import { NodeForm } from '@js-modules/apps-travel-log-common-store-redux';

export type NodeFormsGetOneServiceResponse = AxiosResponse<NodeForm>;

export interface NodeFormsGetManyServiceResponse extends AxiosResponse {
  data: UsersPublicDto[];
}
