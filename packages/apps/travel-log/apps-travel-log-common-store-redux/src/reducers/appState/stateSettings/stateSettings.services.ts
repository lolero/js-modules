import { axiosRequest } from '@js-modules/common-utils-general';
import {
  API_CORE_URI_TRAVEL_LOG,
  ApiControllersTravelLog,
  ApiSubHandlersUsersPrivate,
} from '@js-modules/apps-travel-log-common-constants';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';
import {
  StateSettingsGetProfileServiceResponse,
  StateSettingsResetPasswordServiceResponse,
  StateSettingsUpdateProfileServiceResponse,
} from './stateSettings.services.types';

export async function stateSettingsGetProfileService(): Promise<StateSettingsGetProfileServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPrivate}`,
  );
  return res;
}

export async function stateSettingsUpdateProfileService(
  usersUpdateOnePartialDto: UsersUpdateOnePartialDto,
): Promise<StateSettingsUpdateProfileServiceResponse> {
  const res = await axiosRequest.patch(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPrivate}`,
    usersUpdateOnePartialDto,
  );
  return res;
}

export async function stateSettingsResetPasswordService(): Promise<StateSettingsResetPasswordServiceResponse> {
  const res = await axiosRequest.post(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPrivate}/${ApiSubHandlersUsersPrivate.resetPassword}`,
  );
  return res;
}
