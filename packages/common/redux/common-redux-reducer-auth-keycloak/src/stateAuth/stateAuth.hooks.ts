import {
  createReducerHooks,
  Request,
  RequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { KeycloakConfig } from 'keycloak-js';
import { stateAuthSelectors } from './stateAuth.selectors';
import {
  createStateAuthInitializeRequestAction,
  createStateAuthSigninRequestAction,
  createStateAuthSignoutRequestAction,
} from './stateAuth.actionsCreators';
import { SigninAction, StateAuthReducer } from './stateAuth.types';

export const stateAuthHooks = createReducerHooks(stateAuthSelectors);

export const {
  useRequest: useStateAuthRequest,
  useRequests: useStateAuthRequests,
  useReducerMetadata: useStateAuthReducerMetadata,
  useReducerConfig: useStateAuthReducerConfig,
} = stateAuthHooks;

export function useInitializeKeycloak(keycloakConfig: KeycloakConfig): {
  initializeRequest?: Request<RequestMetadata>;
  authMetadata: StateAuthReducer['metadata'];
} {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [initializeRequestId, setInitializeRequestId] = useState('');
  const initializeRequest = stateAuthRequests[initializeRequestId];

  useEffect(() => {
    const initializeAction =
      createStateAuthInitializeRequestAction(keycloakConfig);
    setInitializeRequestId(initializeAction.requestId);
    dispatch(initializeAction);
  }, [dispatch, keycloakConfig]);

  return {
    initializeRequest,
    authMetadata: stateAuthReducerMetadata,
  };
}

export function useSignup(
  redirectBaseUri: string,
  redirectPath: string,
): {
  signupCallback: () => void;
  signupRequest?: Request<RequestMetadata>;
  authMetadata: StateAuthReducer['metadata'];
} {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [signupRequestId, setSignupRequestId] = useState('');
  const signupRequest = stateAuthRequests[signupRequestId];

  const signupCallback = useCallback(() => {
    const signupAction = createStateAuthSigninRequestAction(
      SigninAction.signup,
      `${redirectBaseUri}${redirectPath}`,
    );
    setSignupRequestId(signupAction.requestId);
    dispatch(signupAction);
  }, [redirectBaseUri, dispatch, redirectPath]);

  return {
    signupCallback,
    signupRequest,
    authMetadata: stateAuthReducerMetadata,
  };
}

export function useLogin(
  redirectBaseUri: string,
  redirectPath: string,
): {
  loginCallback: () => void;
  loginRequest?: Request<RequestMetadata>;
  authMetadata: StateAuthReducer['metadata'];
} {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [loginRequestId, setLoginRequestId] = useState('');
  const loginRequest = stateAuthRequests[loginRequestId];

  const loginCallback = useCallback(() => {
    const loginAction = createStateAuthSigninRequestAction(
      SigninAction.login,
      `${redirectBaseUri}${redirectPath}`,
    );
    setLoginRequestId(loginAction.requestId);
    dispatch(loginAction);
  }, [redirectBaseUri, dispatch, redirectPath]);

  return {
    loginCallback,
    loginRequest,
    authMetadata: stateAuthReducerMetadata,
  };
}

export function useLogout(
  redirectBaseUri: string,
  redirectPath: string,
): {
  logoutCallback: () => void;
  logoutRequest?: Request<RequestMetadata>;
  authMetadata: StateAuthReducer['metadata'];
} {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [logoutRequestId, setLogoutRequestId] = useState('');
  const logoutRequest = stateAuthRequests[logoutRequestId];

  const logoutCallback = useCallback(() => {
    const logoutAction = createStateAuthSignoutRequestAction(
      `${redirectBaseUri}${redirectPath}`,
    );
    setLogoutRequestId(logoutAction.requestId);
    dispatch(logoutAction);
  }, [redirectBaseUri, dispatch, redirectPath]);

  return {
    logoutCallback,
    logoutRequest,
    authMetadata: stateAuthReducerMetadata,
  };
}
