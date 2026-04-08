import type { CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import {
  buildMemoryStorage,
  defaultHeaderInterpreter,
  defaultKeyGenerator,
  setupCache,
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
