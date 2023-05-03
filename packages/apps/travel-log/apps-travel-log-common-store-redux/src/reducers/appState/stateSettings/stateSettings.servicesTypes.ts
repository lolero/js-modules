import { AxiosResponse } from 'axios';
import { UsersPrivateDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.private.dto';

export interface StateSettingsGetProfileServiceResponse extends AxiosResponse {
  data: UsersPrivateDto;
}

export interface StateSettingsUpdateProfileServiceResponse
  extends AxiosResponse {
  data: UsersPrivateDto;
}

export type StateSettingsResetPasswordServiceResponse = AxiosResponse;
