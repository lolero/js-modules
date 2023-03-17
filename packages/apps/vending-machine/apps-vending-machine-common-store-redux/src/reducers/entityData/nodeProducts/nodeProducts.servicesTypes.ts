import { AxiosResponse } from 'axios';
import { ProductsDtoPublic } from '@js-modules/apps-vending-machine-api-core-modules';

export interface NodeProductsCreateOneServiceResponse extends AxiosResponse {
  data: ProductsDtoPublic;
}

export interface NodeProductsGetOneServiceResponse extends AxiosResponse {
  data: ProductsDtoPublic;
}

export interface NodeProductsGetManyServiceResponse extends AxiosResponse {
  data: ProductsDtoPublic[];
}

export interface NodeProductsUpdateOneWholeServiceResponse
  extends AxiosResponse {
  data: ProductsDtoPublic;
}

export type NodeProductsDeleteOneServiceResponse = AxiosResponse;
