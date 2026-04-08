import {
  AppPlatform,
  appPlatformIpDev,
  getDevHostIp,
  IS_ENV_DEV,
} from '@js-modules/common-utils-general';

export const ROUTER__PROTOCOL__TRAVEL_LOG: string = 'https';
export const ROUTER__IP__TRAVEL_LOG: string = IS_ENV_DEV
  ? getDevHostIp()
  : process.env.ROUTER_HOST!;
export const ROUTER__PORT__TRAVEL_LOG: string = '';
// console.log('ROUTER__IP__TRAVEL_LOG:', ROUTER__IP__TRAVEL_LOG);

export const AUTH__PROTOCOL__TRAVEL_LOG: string = ROUTER__PROTOCOL__TRAVEL_LOG;
export const AUTH__IP__TRAVEL_LOG: string = ROUTER__IP__TRAVEL_LOG;
export const AUTH__IP_DEV_ANDROID__TRAVEL_LOG: string =
  appPlatformIpDev[AppPlatform.android];
export const AUTH__PORT__TRAVEL_LOG: string = ROUTER__PORT__TRAVEL_LOG;
export const AUTH__PATH__TRAVEL_LOG: string = '/auth';
export const AUTH__HOST__TRAVEL_LOG: string = `${AUTH__PROTOCOL__TRAVEL_LOG}://${AUTH__IP__TRAVEL_LOG}`;
export const AUTH__HOST_DEV_ANDROID__TRAVEL_LOG: string = `${AUTH__PROTOCOL__TRAVEL_LOG}://${AUTH__IP_DEV_ANDROID__TRAVEL_LOG}`;
export const AUTH__URI__TRAVEL_LOG: string = `${AUTH__HOST__TRAVEL_LOG}${
  AUTH__PORT__TRAVEL_LOG ? `:${AUTH__PORT__TRAVEL_LOG}` : ''
}${AUTH__PATH__TRAVEL_LOG}`;
export const AUTH__URI_DEV_ANDROID__TRAVEL_LOG: string = `${AUTH__HOST_DEV_ANDROID__TRAVEL_LOG}${
  AUTH__PORT__TRAVEL_LOG ? `:${AUTH__PORT__TRAVEL_LOG}` : ''
}${AUTH__PATH__TRAVEL_LOG}`;
// console.log('AUTH__URI__TRAVEL_LOG:', AUTH__URI__TRAVEL_LOG);

// This AUTH_SERVER section was created so that the APIs could talk to the
// auth server internally through the docker-compose network. But keycloak-js
// would not have it since it issues tokens for WEB_CLIENT__URI__TRAVEL_LOG and the API
// is calling it from AUTH_SERVER__URI__TRAVEL_LOG. I left it in case keycloak-js
// publishes an update to support this. Now the API calls the auth server
// through the nginx router, so all calls come from the same origin.
export const AUTH_SERVER__PROTOCOL__TRAVEL_LOG: string =
  AUTH__PROTOCOL__TRAVEL_LOG;
export const AUTH_SERVER__IP__TRAVEL_LOG: string = IS_ENV_DEV
  ? AUTH__IP__TRAVEL_LOG
  : AUTH__IP__TRAVEL_LOG;
// : 'auth-service';
export const AUTH_SERVER__PORT__TRAVEL_LOG: string = IS_ENV_DEV
  ? AUTH__PORT__TRAVEL_LOG
  : AUTH__PORT__TRAVEL_LOG;
// : '8080';
export const AUTH_SERVER__PATH__TRAVEL_LOG: string = AUTH__PATH__TRAVEL_LOG;
export const AUTH_SERVER__HOST__TRAVEL_LOG: string = `${AUTH_SERVER__PROTOCOL__TRAVEL_LOG}://${AUTH_SERVER__IP__TRAVEL_LOG}`;
export const AUTH_SERVER__URI__TRAVEL_LOG: string = `${AUTH_SERVER__HOST__TRAVEL_LOG}${
  AUTH_SERVER__PORT__TRAVEL_LOG ? `:${AUTH_SERVER__PORT__TRAVEL_LOG}` : ''
}${AUTH_SERVER__PATH__TRAVEL_LOG}`;
// console.log('AUTH_SERVER__URI__TRAVEL_LOG:', AUTH_SERVER__URI__TRAVEL_LOG);

export const WEB_CLIENT__PROTOCOL__TRAVEL_LOG: string =
  ROUTER__PROTOCOL__TRAVEL_LOG;
export const WEB_CLIENT__IP__TRAVEL_LOG: string = ROUTER__IP__TRAVEL_LOG;
export const WEB_CLIENT__PORT__TRAVEL_LOG: string = ROUTER__PORT__TRAVEL_LOG;
export const WEB_CLIENT__PATH__TRAVEL_LOG: string = '';
export const WEB_CLIENT__HOST__TRAVEL_LOG: string = `${WEB_CLIENT__PROTOCOL__TRAVEL_LOG}://${WEB_CLIENT__IP__TRAVEL_LOG}`;
export const WEB_CLIENT__URI__TRAVEL_LOG: string = `${WEB_CLIENT__HOST__TRAVEL_LOG}${
  WEB_CLIENT__PORT__TRAVEL_LOG ? `:${WEB_CLIENT__PORT__TRAVEL_LOG}` : ''
}${WEB_CLIENT__PATH__TRAVEL_LOG}`;
// console.log('WEB_CLIENT__URI__TRAVEL_LOG:', WEB_CLIENT__URI__TRAVEL_LOG);

export const API_CORE__PROTOCOL__TRAVEL_LOG: string =
  ROUTER__PROTOCOL__TRAVEL_LOG;
export const API_CORE__IP__TRAVEL_LOG: string = ROUTER__IP__TRAVEL_LOG;
export const API_CORE__PORT__TRAVEL_LOG: string = ROUTER__PORT__TRAVEL_LOG;
export const API_CORE__PATH__TRAVEL_LOG: string = '/api';
export const API_CORE__HOST__TRAVEL_LOG: string = `${API_CORE__PROTOCOL__TRAVEL_LOG}://${API_CORE__IP__TRAVEL_LOG}`;
export const API_CORE__URI__TRAVEL_LOG: string = `${API_CORE__HOST__TRAVEL_LOG}${
  API_CORE__PORT__TRAVEL_LOG ? `:${API_CORE__PORT__TRAVEL_LOG}` : ''
}${API_CORE__PATH__TRAVEL_LOG}`;
// console.log('API_CORE__URI__TRAVEL_LOG:', API_CORE__URI__TRAVEL_LOG);

export const API_CORE_SERVER__IP__TRAVEL_LOG: string = '0.0.0.0';
export const API_CORE_SERVER__PORT__TRAVEL_LOG: string = '3000';
