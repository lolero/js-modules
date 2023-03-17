import axios, { CreateAxiosDefaults } from 'axios';
import {
  setupCache,
  buildMemoryStorage,
  defaultKeyGenerator,
  defaultHeaderInterpreter,
} from 'axios-cache-interceptor';

const axiosConfig: CreateAxiosDefaults = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const axiosRequest = axios.create(axiosConfig);

export const axiosRequestCached = setupCache(axios.create(axiosConfig), {
  storage: buildMemoryStorage(),
  generateKey: defaultKeyGenerator,
  headerInterpreter: defaultHeaderInterpreter,
  debug: undefined,
});
