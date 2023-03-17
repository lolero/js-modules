import {
  createReducerHooks,
  Request,
  UseRequestCallback,
  UseRequestReducerMetadata,
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
import {
  StateAuthInitializeRequestAction,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
} from './stateAuth.actionsTypes';

export const stateAuthHooks = createReducerHooks(stateAuthSelectors);

export const {
  useRequest: useStateAuthRequest,
  useRequests: useStateAuthRequests,
  useReducerMetadata: useStateAuthReducerMetadata,
  useReducerConfig: useStateAuthReducerConfig,
} = stateAuthHooks;

export function useStateAuthInitializeKeycloak(
  keycloakConfig: KeycloakConfig,
): UseRequestReducerMetadata<
  StateAuthInitializeRequestAction['requestMetadata'],
  StateAuthReducer['metadata']
> {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [initializeRequestId, setInitializeRequestId] = useState('');
  const initializeRequest = stateAuthRequests[initializeRequestId] as Request<
    StateAuthInitializeRequestAction['requestMetadata']
  >;

  useEffect(() => {
    if (initializeRequestId) {
      return;
    }

    const initializeAction =
      createStateAuthInitializeRequestAction(keycloakConfig);
    setInitializeRequestId(initializeAction.requestId);
    dispatch(initializeAction);
  }, [dispatch, initializeRequest, initializeRequestId, keycloakConfig]);

  return {
    request: initializeRequest,
    reducerMetadata: stateAuthReducerMetadata,
  };
}

export function useStateAuthSignup(
  redirectBaseUri: string,
  redirectPath: string,
): UseRequestCallback<
  StateAuthSigninRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
  never,
  () => void
> {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [signupRequestId, setSignupRequestId] = useState('');
  const signupRequest = stateAuthRequests[signupRequestId] as Request<
    StateAuthSigninRequestAction['requestMetadata']
  >;

  const signupCallback = useCallback(() => {
    const signupAction = createStateAuthSigninRequestAction(
      SigninAction.signup,
      `${redirectBaseUri}${redirectPath}`,
    );
    setSignupRequestId(signupAction.requestId);
    dispatch(signupAction);
  }, [redirectBaseUri, dispatch, redirectPath]);

  return {
    request: signupRequest,
    reducerMetadata: stateAuthReducerMetadata,
    entities: {},
    callback: signupCallback,
  };
}

export function useStateAuthLogin(
  redirectBaseUri: string,
  redirectPath: string,
): UseRequestCallback<
  StateAuthSigninRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
  never,
  () => void
> {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [loginRequestId, setLoginRequestId] = useState('');
  const loginRequest = stateAuthRequests[loginRequestId] as Request<
    StateAuthSigninRequestAction['requestMetadata']
  >;

  const loginCallback = useCallback(() => {
    const loginAction = createStateAuthSigninRequestAction(
      SigninAction.login,
      `${redirectBaseUri}${redirectPath}`,
    );
    setLoginRequestId(loginAction.requestId);
    dispatch(loginAction);
  }, [redirectBaseUri, dispatch, redirectPath]);

  return {
    request: loginRequest,
    reducerMetadata: stateAuthReducerMetadata,
    entities: {},
    callback: loginCallback,
  };
}

export function useStateAuthLogout(
  redirectBaseUri: string,
  redirectPath: string,
): UseRequestCallback<
  StateAuthSignoutRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
  never,
  () => void
> {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [logoutRequestId, setLogoutRequestId] = useState('');
  const logoutRequest = stateAuthRequests[logoutRequestId] as Request<
    StateAuthSignoutRequestAction['requestMetadata']
  >;

  const logoutCallback = useCallback(() => {
    const logoutAction = createStateAuthSignoutRequestAction(
      `${redirectBaseUri}${redirectPath}`,
    );
    setLogoutRequestId(logoutAction.requestId);
    dispatch(logoutAction);
  }, [redirectBaseUri, dispatch, redirectPath]);

  return {
    request: logoutRequest,
    reducerMetadata: stateAuthReducerMetadata,
    entities: {},
    callback: logoutCallback,
  };
}
