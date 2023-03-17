import { axiosRequest } from '@js-modules/common-utils-general';
import { API_CORE_BASE_URI } from '@js-modules/apps-vending-machine-common-constants';
import { UsersDtoPurchase } from '@js-modules/apps-vending-machine-api-core-modules';
import {
  StateMainDepositServiceResponse,
  StateMainGetMyBalanceServiceResponse,
  StateMainPurchaseServiceResponse,
  StateMainResetServiceResponse,
} from './stateMain.servicesTypes';

export async function stateMainGetMyBalanceService(): Promise<StateMainGetMyBalanceServiceResponse> {
  const res = await axiosRequest.get(`${API_CORE_BASE_URI}/users/my-balance`);
  return res;
}

export async function stateMainDepositService(
  amount: number,
): Promise<StateMainDepositServiceResponse> {
  const res = await axiosRequest.post(`${API_CORE_BASE_URI}/users/deposit`, {
    amount,
  });
  return res;
}

export async function stateMainPurchaseService(
  usersDtoPurchase: UsersDtoPurchase,
): Promise<StateMainPurchaseServiceResponse> {
  const test = usersDtoPurchase;
  const res = await axiosRequest.post(
    `${API_CORE_BASE_URI}/users/purchase`,
    test,
  );
  return res;
}

export async function stateMainResetService(): Promise<StateMainResetServiceResponse> {
  const res = await axiosRequest.post(`${API_CORE_BASE_URI}/users/reset`);
  return res;
}
