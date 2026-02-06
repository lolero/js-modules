import {
  Request,
  RequestMetadata,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  createStateAuthInitializeRequestAction,
  createStateAuthSigninRequestAction,
  createStateAuthSignoutRequestAction,
  STATE_AUTH__INITIALIZE__REQUEST_ID,
  STATE_AUTH__SIGNIN__REQUEST_ID,
  STATE_AUTH__SIGNOUT__REQUEST_ID,
} from './stateAuth.actions.creators';
import {
  SigninAction,
  StateAuthReducer,
  StateAuthReducerMetadata,
} from './stateAuth.types';
import {
  StateAuthInitializeRequestAction,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
} from './stateAuth.actions.types';

export function getStateAuthActionHooks(
  useStateAuthRequest: (
    requestId: string,
  ) => Request<RequestMetadata> | undefined,
  useStateAuthReducerMetadata: () => StateAuthReducerMetadata,
) {
  function useStateAuthInitializeKeycloak(
    keycloakServerConfig: StateAuthInitializeRequestAction['requestMetadata']['keycloakServerConfig'],
    keycloakInitOptions: StateAuthInitializeRequestAction['requestMetadata']['keycloakInitOptions'],
    onSigninCallback?: StateAuthInitializeRequestAction['requestMetadata']['onSigninCallback'],
    onSignoutCallback?: StateAuthInitializeRequestAction['requestMetadata']['onSignoutCallback'],
  ): UseRequestReducerMetadata<
    StateAuthInitializeRequestAction['requestMetadata'],
    StateAuthReducer['metadata'],
    () => void
  > {
    const dispatch = useDispatch();
    const request = useStateAuthRequest(
      STATE_AUTH__INITIALIZE__REQUEST_ID,
    ) as Request<StateAuthInitializeRequestAction['requestMetadata']>;
    const reducerMetadata = useStateAuthReducerMetadata();

    const callback = useCallback(() => {
      if (request) {
        return;
      }

      const action = createStateAuthInitializeRequestAction(
        keycloakServerConfig,
        keycloakInitOptions,
        onSigninCallback,
        onSignoutCallback,
      );
      dispatch(action);
    }, [
      dispatch,
      keycloakServerConfig,
      keycloakInitOptions,
      onSigninCallback,
      onSignoutCallback,
      request,
    ]);

    return {
      request,
      reducerMetadata,
      callback,
    };
  }

  function useStateAuthSignup(
    keycloakLoginOptions: StateAuthSigninRequestAction['requestMetadata']['keycloakLoginOptions'],
    onSigninCallback?: StateAuthSigninRequestAction['requestMetadata']['onSigninCallback'],
  ): UseRequestReducerMetadata<
    StateAuthSigninRequestAction['requestMetadata'],
    StateAuthReducer['metadata'],
    () => void
  > {
    const dispatch = useDispatch();
    const request = useStateAuthRequest(
      STATE_AUTH__SIGNIN__REQUEST_ID,
    ) as Request<StateAuthSigninRequestAction['requestMetadata']>;
    const reducerMetadata = useStateAuthReducerMetadata();

    const callback = useCallback(() => {
      const action = createStateAuthSigninRequestAction(
        SigninAction.signup,
        keycloakLoginOptions,
        onSigninCallback,
      );
      dispatch(action);
    }, [dispatch, keycloakLoginOptions, onSigninCallback]);

    return {
      request,
      reducerMetadata,
      callback,
    };
  }

  function useStateAuthLogin(
    keycloakLoginOptions: StateAuthSigninRequestAction['requestMetadata']['keycloakLoginOptions'],
    onSigninCallback?: StateAuthSigninRequestAction['requestMetadata']['onSigninCallback'],
  ): UseRequestReducerMetadata<
    StateAuthSigninRequestAction['requestMetadata'],
    StateAuthReducer['metadata'],
    () => void
  > {
    const dispatch = useDispatch();
    const request = useStateAuthRequest(
      STATE_AUTH__SIGNIN__REQUEST_ID,
    ) as Request<StateAuthSigninRequestAction['requestMetadata']>;
    const reducerMetadata = useStateAuthReducerMetadata();

    const callback = useCallback(() => {
      const action = createStateAuthSigninRequestAction(
        SigninAction.login,
        keycloakLoginOptions,
        onSigninCallback,
      );
      dispatch(action);
    }, [dispatch, keycloakLoginOptions, onSigninCallback]);

    return {
      request,
      reducerMetadata,
      callback,
    };
  }

  function useStateAuthLogout(
    keycloakLogoutOptions: StateAuthSignoutRequestAction['requestMetadata']['keycloakLogoutOptions'],
    onSignoutCallback?: StateAuthSignoutRequestAction['requestMetadata']['onSignoutCallback'],
  ): UseRequestReducerMetadata<
    StateAuthSignoutRequestAction['requestMetadata'],
    StateAuthReducer['metadata'],
    () => void
  > {
    const dispatch = useDispatch();
    const request = useStateAuthRequest(
      STATE_AUTH__SIGNOUT__REQUEST_ID,
    ) as Request<StateAuthSignoutRequestAction['requestMetadata']>;
    const reducerMetadata = useStateAuthReducerMetadata();

    const callback = useCallback(() => {
      const action = createStateAuthSignoutRequestAction(
        keycloakLogoutOptions,
        onSignoutCallback,
      );
      dispatch(action);
    }, [dispatch, keycloakLogoutOptions, onSignoutCallback]);

    return {
      request,
      reducerMetadata,
      callback,
    };
  }

  return {
    useStateAuthInitializeKeycloak,
    useStateAuthSignup,
    useStateAuthLogin,
    useStateAuthLogout,
  };
}
