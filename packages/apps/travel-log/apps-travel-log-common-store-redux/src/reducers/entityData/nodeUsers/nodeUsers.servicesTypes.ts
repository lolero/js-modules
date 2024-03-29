import { AxiosResponse } from 'axios';
import { UsersPublicDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.public.dto';

export interface NodeUsersGetOneServiceResponse extends AxiosResponse {
  data: UsersPublicDto;
}

export interface NodeUsersGetManyServiceResponse extends AxiosResponse {
  data: UsersPublicDto[];
}
