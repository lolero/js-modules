import { axiosRequest, axiosRequestCached } from './commonUtilsAxios.constants';

/**
 * Set axios request Authorization header
 */
export function axiosRequestSetAuthHeader(token: string | null): void {
  if (token) {
    axiosRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosRequestCached.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosRequest.defaults.headers.common.Authorization;
    delete axiosRequestCached.defaults.headers.common.Authorization;
  }
}
