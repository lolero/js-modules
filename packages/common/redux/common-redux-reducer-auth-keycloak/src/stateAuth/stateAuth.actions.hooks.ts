import { useDispatch } from 'react-redux';
import type {
  Request,
  RequestMetadata,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  createStateAuthInitializeRequestAction,
  createStateAuthSigninRequestAction,
  createStateAuthSignoutRequestAction,
  STATE_AUTH__INITIALIZE__REQUEST_ID,
  STATE_AUTH__SIGNIN__REQUEST_ID,
  STATE_AUTH__SIGNOUT__REQUEST_ID,
} from './stateAuth.actions.creators';
import type {
  StateAuthInitializeRequestAction,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
} from './stateAuth.actions.types';
import type {
  StateAuthReducer,
  StateAuthReducerMetadata,
} from './stateAuth.types';
import { SigninAction } from './stateAuth.types';

type StateAuthActionHooks = {
  useStateAuthInitializeKeycloak: (
    keycloakServerConfig: StateAuthInitializeRequestAction['requestMetadata']['keycloakServerConfig'],
    keycloakInitOptions: StateAuthInitializeRequestAction['requestMetadata']['keycloakInitOptions'],
    onSigninCallback?: StateAuthInitializeRequestAction['requestMetadata']['onSigninCallback'],
    onSignoutCallback?: StateAuthInitializeRequestAction['requestMetadata']['onSignoutCallback'],
  ) => UseRequestReducerMetadata<
    StateAuthInitializeRequestAction['requestMetadata'],
    StateAuthReducer['metadata'],
    () => void
  >;
  useStateAuthSignup: StateAuthSigninHook;
  useStateAuthLogin: StateAuthSigninHook;
  useStateAuthLogout: (
    keycloakLogoutOptions: StateAuthSignoutRequestAction['requestMetadata']['keycloakLogoutOptions'],
    onSignoutCallback?: StateAuthSignoutRequestAction['requestMetadata']['onSignoutCallback'],
  ) => UseRequestReducerMetadata<
    StateAuthSignoutRequestAction['requestMetadata'],
    StateAuthReducer['metadata'],
    () => void
  >;
};

type StateAuthSigninHook = (
  keycloakLoginOptions: StateAuthSigninRequestAction['requestMetadata']['keycloakLoginOptions'],
  onSigninCallback?: StateAuthSigninRequestAction['requestMetadata']['onSigninCallback'],
) => UseRequestReducerMetadata<
  StateAuthSigninRequestAction['requestMetadata'],
  StateAuthReducer['metadata'],
  () => void
>;

export function getStateAuthActionHooks(
  useStateAuthRequest: (
    requestId: string,
  ) => Request<RequestMetadata> | undefined,
  useStateAuthReducerMetadata: () => StateAuthReducerMetadata,
): StateAuthActionHooks {
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

    function callback(): void {
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
    }

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

    function callback(): void {
      const action = createStateAuthSigninRequestAction(
        SigninAction.signup,
        keycloakLoginOptions,
        onSigninCallback,
      );
      dispatch(action);
    }

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

    function callback(): void {
      const action = createStateAuthSigninRequestAction(
        SigninAction.login,
        keycloakLoginOptions,
        onSigninCallback,
      );
      dispatch(action);
    }

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

    function callback(): void {
      const action = createStateAuthSignoutRequestAction(
        keycloakLogoutOptions,
        onSignoutCallback,
      );
      dispatch(action);
    }

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
