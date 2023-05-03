import { axiosRequest } from '@js-modules/common-utils-general';
import { API_CORE_BASE_URI } from '@js-modules/apps-travel-log-common-constants';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';
import {
  StateSettingsGetProfileServiceResponse,
  StateSettingsResetPasswordServiceResponse,
  StateSettingsUpdateProfileServiceResponse,
} from './stateSettings.servicesTypes';

export async function stateSettingsGetProfileService(): Promise<StateSettingsGetProfileServiceResponse> {
  const res = await axiosRequest.get(`${API_CORE_BASE_URI}/users-private`);
  return res;
}

export async function stateSettingsUpdateProfileService(
  usersUpdateOnePartialDto: UsersUpdateOnePartialDto,
): Promise<StateSettingsUpdateProfileServiceResponse> {
  const res = await axiosRequest.patch(
    `${API_CORE_BASE_URI}/users-private`,
    usersUpdateOnePartialDto,
  );
  return res;
}

export async function stateSettingsResetPasswordService(): Promise<StateSettingsResetPasswordServiceResponse> {
  const res = await axiosRequest.post(
    `${API_CORE_BASE_URI}/users-private/reset-password`,
  );
  return res;
}
