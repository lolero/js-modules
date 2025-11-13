import { getStateAuthActionHooks } from '@js-modules/common-redux-reducer-auth-keycloak';
import {
  useStateAuthRequest,
  useStateAuthReducerMetadata,
} from './stateAuth.hooks';

export const {
  useStateAuthInitializeKeycloak,
  useStateAuthSignup,
  useStateAuthLogin,
  useStateAuthLogout,
} = getStateAuthActionHooks(useStateAuthRequest, useStateAuthReducerMetadata);
