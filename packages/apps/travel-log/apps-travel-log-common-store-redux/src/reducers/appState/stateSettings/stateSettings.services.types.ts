import { AxiosResponse } from 'axios';
import { UsersPrivateDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/users/dtos/users.private.dto';

export type StateSettingsGetProfileServiceResponse =
  AxiosResponse<UsersPrivateDto>;

export type StateSettingsUpdateProfileServiceResponse =
  AxiosResponse<UsersPrivateDto>;

export type StateSettingsResetPasswordServiceResponse = AxiosResponse;
