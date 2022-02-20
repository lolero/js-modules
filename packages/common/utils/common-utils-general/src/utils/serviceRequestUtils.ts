import axios from 'axios';

export const axiosRequest = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

/**
 * Set axios request Authorization header
 */
export function axiosRequestSetAuthHeader(token: string | undefined): void {
  if (token) {
    axiosRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosRequest.defaults.headers.common.Authorization;
  }
}
