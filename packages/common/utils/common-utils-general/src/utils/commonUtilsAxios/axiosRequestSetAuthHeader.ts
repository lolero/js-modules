import { axiosRequest } from './commonUtilsAxios.constants';

/**
 * Set axios request Authorization header
 */
function axiosRequestSetAuthHeader(token: string | undefined): void {
  if (token) {
    axiosRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosRequest.defaults.headers.common.Authorization;
  }
}

export default axiosRequestSetAuthHeader;
