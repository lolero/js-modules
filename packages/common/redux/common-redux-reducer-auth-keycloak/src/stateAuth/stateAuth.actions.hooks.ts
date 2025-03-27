import {
  Request,
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
import { SigninAction, StateAuthReducer } from './stateAuth.types';
import {
  StateAuthInitializeRequestAction,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
} from './stateAuth.actions.types';
import {
  useStateAuthReducerMetadata,
  useStateAuthRequest,
} from './stateAuth.hooks';

export function useStateAuthInitializeKeycloak(
  keycloakConfig: StateAuthInitializeRequestAction['requestMetadata']['keycloakConfig'],
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
      keycloakConfig,
      onSigninCallback,
      onSignoutCallback,
    );
    dispatch(action);
  }, [dispatch, keycloakConfig, onSigninCallback, onSignoutCallback, request]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateAuthSignup(
  redirectBaseUri: string,
  redirectPath: string,
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
      `${redirectBaseUri}${redirectPath}`,
      onSigninCallback,
    );
    dispatch(action);
  }, [dispatch, onSigninCallback, redirectBaseUri, redirectPath]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateAuthLogin(
  redirectBaseUri: string,
  redirectPath: string,
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
      `${redirectBaseUri}${redirectPath}`,
      onSigninCallback,
    );
    dispatch(action);
  }, [dispatch, onSigninCallback, redirectBaseUri, redirectPath]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateAuthLogout(
  redirectBaseUri: string,
  redirectPath: string,
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
      `${redirectBaseUri}${redirectPath}`,
      onSignoutCallback,
    );
    dispatch(action);
  }, [dispatch, onSignoutCallback, redirectBaseUri, redirectPath]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}
