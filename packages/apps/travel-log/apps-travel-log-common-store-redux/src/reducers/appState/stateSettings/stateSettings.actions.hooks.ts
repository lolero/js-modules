import {
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import {
  useStateSettingsReducerMetadata,
  useStateSettingsRequest,
} from './stateSettings.hooks';
import {
  StateSettingsGetProfileRequestAction,
  StateSettingsResetPasswordRequestAction,
  StateSettingsSignoutRequestAction,
  StateSettingsUpdatePartialReducerMetadataRequestAction,
} from './stateSettings.actions.types';
import { StateSettingsReducer } from './stateSettings.types';
import {
  createStateSettingsGetProfileRequestAction,
  createStateSettingsResetPasswordRequestAction,
  createStateSettingsSignoutRequestAction,
  createStateSettingsUpdatePartialReducerMetadataRequestAction,
  STATE_SETTINGS__GET_PROFILE__REQUEST_ID,
  STATE_SETTINGS__RESET_PASSWORD__REQUEST_ID,
  STATE_SETTINGS__SIGNOUT__REQUEST_ID,
} from './stateSettings.actions.creators';

export function useStateSettingsUpdatePartialReducerMetadata(): UseRequestReducerMetadata<
  StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata'],
  StateSettingsReducer['metadata'],
  (
    partialReducerMetadata: StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useStateSettingsRequest(requestId) as Request<
    StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata']
  >;
  const reducerMetadata = useStateSettingsReducerMetadata();

  const callback = useCallback(
    (
      partialReducerMetadata: StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
    ) => {
      const action =
        createStateSettingsUpdatePartialReducerMetadataRequestAction(
          partialReducerMetadata,
        );
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch],
  );

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateSettingsGetProfile(): UseRequestReducerMetadata<
  StateSettingsGetProfileRequestAction['requestMetadata'],
  StateSettingsReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const request = useStateSettingsRequest(
    STATE_SETTINGS__GET_PROFILE__REQUEST_ID,
  ) as Request<StateSettingsGetProfileRequestAction['requestMetadata']>;
  const reducerMetadata = useStateSettingsReducerMetadata();

  const callback = useCallback(() => {
    const action = createStateSettingsGetProfileRequestAction();
    dispatch(action);
  }, [dispatch]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateSettingsResetPassword(): UseRequestReducerMetadata<
  StateSettingsResetPasswordRequestAction['requestMetadata'],
  StateSettingsReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const request = useStateSettingsRequest(
    STATE_SETTINGS__RESET_PASSWORD__REQUEST_ID,
  ) as Request<StateSettingsResetPasswordRequestAction['requestMetadata']>;
  const reducerMetadata = useStateSettingsReducerMetadata();

  const callback = useCallback(() => {
    const action = createStateSettingsResetPasswordRequestAction();
    dispatch(action);
  }, [dispatch]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateSettingsSignout(): UseRequestReducerMetadata<
  StateSettingsSignoutRequestAction['requestMetadata'],
  StateSettingsReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const request = useStateSettingsRequest(
    STATE_SETTINGS__SIGNOUT__REQUEST_ID,
  ) as Request<StateSettingsSignoutRequestAction['requestMetadata']>;
  const reducerMetadata = useStateSettingsReducerMetadata();

  const callback = useCallback(() => {
    const action = createStateSettingsSignoutRequestAction();
    dispatch(action);
  }, [dispatch]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}
