import { axiosRequest } from '@js-modules/common-utils-general';
import {
  ProductsDtoCreateOne,
  ProductsDtoUpdateOneWhole,
} from '@js-modules/apps-vending-machine-api-core-modules';
import { AxiosResponse } from 'axios';
import { API_CORE_BASE_URI } from '@js-modules/apps-vending-machine-common-constants';
import {
  NodeProductsCreateOneServiceResponse,
  NodeProductsDeleteOneServiceResponse,
  NodeProductsGetManyServiceResponse,
  NodeProductsGetOneServiceResponse,
  NodeProductsUpdateOneWholeServiceResponse,
} from './nodeProducts.servicesTypes';

export async function nodeProductsCreateOneService(
  productsDtoCreateOne: ProductsDtoCreateOne,
): Promise<NodeProductsCreateOneServiceResponse> {
  const res = await axiosRequest.post(
    `${API_CORE_BASE_URI}/products`,
    productsDtoCreateOne,
  );
  return res;
}

export async function nodeProductsGetOneService(
  id: number,
): Promise<NodeProductsGetOneServiceResponse> {
  const res = await axiosRequest.get(`${API_CORE_BASE_URI}/products/${id}`);
  return res;
}

export async function nodeProductsGetManyService(
  sellerKeycloakId?: string,
): Promise<NodeProductsGetManyServiceResponse> {
  let res: AxiosResponse;
  if (sellerKeycloakId) {
    res = await axiosRequest.get(`${API_CORE_BASE_URI}/products/my-products`);
  } else {
    res = await axiosRequest.get(`${API_CORE_BASE_URI}/products`);
  }
  return res;
}

export async function nodeProductsUpdateOneWholeService(
  productsDtoUpdateOneWhole: ProductsDtoUpdateOneWhole,
): Promise<NodeProductsUpdateOneWholeServiceResponse> {
  const res = await axiosRequest.put(
    `${API_CORE_BASE_URI}/products`,
    productsDtoUpdateOneWhole,
  );
  return res;
}

export async function nodeProductsDeleteOneService(
  id: number,
): Promise<NodeProductsDeleteOneServiceResponse> {
  const res = await axiosRequest.delete(`${API_CORE_BASE_URI}/products/${id}`);
  return res;
}
