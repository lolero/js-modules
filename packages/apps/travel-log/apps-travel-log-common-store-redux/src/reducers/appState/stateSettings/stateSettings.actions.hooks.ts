import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type {
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  createStateSettingsGetProfileRequestAction,
  createStateSettingsResetPasswordRequestAction,
  createStateSettingsSignoutRequestAction,
  createStateSettingsUpdatePartialReducerMetadataRequestAction,
  createStateSettingsUpdateProfileRequestAction,
  STATE_SETTINGS__GET_PROFILE__REQUEST_ID,
  STATE_SETTINGS__RESET_PASSWORD__REQUEST_ID,
  STATE_SETTINGS__SIGNOUT__REQUEST_ID,
  STATE_SETTINGS__UPDATE_PROFILE__REQUEST_ID,
} from './stateSettings.actions.creators';
import type {
  StateSettingsGetProfileRequestAction,
  StateSettingsResetPasswordRequestAction,
  StateSettingsSignoutRequestAction,
  StateSettingsUpdatePartialReducerMetadataRequestAction,
  StateSettingsUpdateProfileRequestAction,
} from './stateSettings.actions.types';
import {
  useStateSettingsReducerMetadata,
  useStateSettingsRequest,
} from './stateSettings.hooks';
import type { StateSettingsReducer } from './stateSettings.types';

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

  function callback(
    partialReducerMetadata: StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
  ): void {
    const action = createStateSettingsUpdatePartialReducerMetadataRequestAction(
      partialReducerMetadata,
    );
    setRequestId(action.requestId);
    dispatch(action);
  }

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

  function callback(): void {
    const action = createStateSettingsGetProfileRequestAction();
    dispatch(action);
  }

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useStateSettingsUpdateProfile(): UseRequestReducerMetadata<
  StateSettingsUpdateProfileRequestAction['requestMetadata'],
  StateSettingsReducer['metadata'],
  (
    usersUpdateOnePartialDto: StateSettingsUpdateProfileRequestAction['requestMetadata']['usersUpdateOnePartialDto'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useStateSettingsRequest(
    STATE_SETTINGS__UPDATE_PROFILE__REQUEST_ID,
  ) as Request<StateSettingsUpdateProfileRequestAction['requestMetadata']>;
  const reducerMetadata = useStateSettingsReducerMetadata();

  function callback(
    usersUpdateOnePartialDto: StateSettingsUpdateProfileRequestAction['requestMetadata']['usersUpdateOnePartialDto'],
  ): void {
    const action = createStateSettingsUpdateProfileRequestAction(
      usersUpdateOnePartialDto,
    );
    dispatch(action);
  }

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

  function callback(): void {
    const action = createStateSettingsResetPasswordRequestAction();
    dispatch(action);
  }

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

  function callback(): void {
    const action = createStateSettingsSignoutRequestAction();
    dispatch(action);
  }

  return {
    request,
    reducerMetadata,
    callback,
  };
}
