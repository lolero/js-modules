import { AxiosResponse } from 'axios';
import { UsersPublicDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/users/dtos/users.public.dto';

export type NodeUsersGetOneServiceResponse = AxiosResponse<UsersPublicDto>;

export type NodeUsersGetManyServiceResponse = AxiosResponse<UsersPublicDto[]>;
