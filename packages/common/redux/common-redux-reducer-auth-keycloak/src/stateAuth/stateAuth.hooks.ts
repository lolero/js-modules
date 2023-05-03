import {
  createReducerHooks,
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
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
  keycloakConfig: StateAuthInitializeRequestAction['requestMetadata']['keycloakConfig'],
  onSigninActionCreator?: StateAuthInitializeRequestAction['requestMetadata']['onSigninActionCreator'],
  onSignoutActionCreator?: StateAuthInitializeRequestAction['requestMetadata']['onSignoutActionCreator'],
): UseRequestReducerMetadata<
  StateAuthInitializeRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const stateAuthReducerMetadata = useStateAuthReducerMetadata();
  const stateAuthRequests = useStateAuthRequests();
  const [initializeRequestId, setInitializeRequestId] = useState('');
  const initializeRequest = stateAuthRequests[initializeRequestId] as Request<
    StateAuthInitializeRequestAction['requestMetadata']
  >;

  const initializeKeycloakCallback = useCallback(() => {
    if (initializeRequestId) {
      return;
    }

    const initializeAction = createStateAuthInitializeRequestAction(
      keycloakConfig,
      onSigninActionCreator,
      onSignoutActionCreator,
    );
    setInitializeRequestId(initializeAction.requestId);
    dispatch(initializeAction);
  }, [
    dispatch,
    initializeRequestId,
    keycloakConfig,
    onSigninActionCreator,
    onSignoutActionCreator,
  ]);

  return {
    request: initializeRequest,
    reducerMetadata: stateAuthReducerMetadata,
    callback: initializeKeycloakCallback,
  };
}

export function useStateAuthSignup(
  redirectBaseUri: string,
  redirectPath: string,
  onSigninActionCreator?: StateAuthSigninRequestAction['requestMetadata']['onSigninActionCreator'],
): UseRequestReducerMetadata<
  StateAuthSigninRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
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
      onSigninActionCreator,
    );
    setSignupRequestId(signupAction.requestId);
    dispatch(signupAction);
  }, [onSigninActionCreator, redirectBaseUri, redirectPath, dispatch]);

  return {
    request: signupRequest,
    reducerMetadata: stateAuthReducerMetadata,
    callback: signupCallback,
  };
}

export function useStateAuthLogin(
  redirectBaseUri: string,
  redirectPath: string,
  onSigninActionCreator?: StateAuthSigninRequestAction['requestMetadata']['onSigninActionCreator'],
): UseRequestReducerMetadata<
  StateAuthSigninRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
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
      onSigninActionCreator,
    );
    setLoginRequestId(loginAction.requestId);
    dispatch(loginAction);
  }, [redirectBaseUri, redirectPath, onSigninActionCreator, dispatch]);

  return {
    request: loginRequest,
    reducerMetadata: stateAuthReducerMetadata,
    callback: loginCallback,
  };
}

export function useStateAuthLogout(
  redirectBaseUri: string,
  redirectPath: string,
  onSignoutActionCreator?: StateAuthSignoutRequestAction['requestMetadata']['onSignoutActionCreator'],
): UseRequestReducerMetadata<
  StateAuthSignoutRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
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
      onSignoutActionCreator,
    );
    setLogoutRequestId(logoutAction.requestId);
    dispatch(logoutAction);
  }, [redirectBaseUri, redirectPath, onSignoutActionCreator, dispatch]);

  return {
    request: logoutRequest,
    reducerMetadata: stateAuthReducerMetadata,
    callback: logoutCallback,
  };
}
