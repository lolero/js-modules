import { AxiosResponse } from 'axios';
import { ProductsDtoPublic } from '@js-modules/apps-vending-machine-api-core-modules';

export interface StateMainGetMyBalanceServiceResponse extends AxiosResponse {
  data: number;
}

export interface StateMainDepositServiceResponse extends AxiosResponse {
  data: {
    balance: number;
  };
}

export interface StateMainPurchaseServiceResponse extends AxiosResponse {
  data: {
    products: ProductsDtoPublic[];
    balance: number;
    change: number[];
  };
}

export interface StateMainResetServiceResponse extends AxiosResponse {
  data: {
    balance: number;
    change: number[];
  };
}
