import {
  createReducerHooks,
  Request,
  RequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { stateAuthSelectors } from './stateAuth.selectors';
import {
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

export function useSignup(redirectUri?: string): {
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
      redirectUri,
    );
    setSignupRequestId(signupAction.requestId);
    dispatch(signupAction);
  }, [dispatch, redirectUri]);

  return {
    signupCallback,
    signupRequest,
    authMetadata: stateAuthReducerMetadata,
  };
}

export function useLogin(redirectUri?: string): {
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
      redirectUri,
    );
    setLoginRequestId(loginAction.requestId);
    dispatch(loginAction);
  }, [dispatch, redirectUri]);

  return {
    loginCallback,
    loginRequest,
    authMetadata: stateAuthReducerMetadata,
  };
}

export function useLogout(): {
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
    const logoutAction = createStateAuthSignoutRequestAction();
    setLogoutRequestId(logoutAction.requestId);
    dispatch(logoutAction);
  }, [dispatch]);

  return {
    logoutCallback,
    logoutRequest,
    authMetadata: stateAuthReducerMetadata,
  };
}
