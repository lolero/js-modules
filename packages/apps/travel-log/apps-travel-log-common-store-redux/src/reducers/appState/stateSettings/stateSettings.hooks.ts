import {
  Request,
  createReducerHooks,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';
import {
  FormErrors,
  FormValidator,
  validateDto,
} from '@js-modules/web-react-hooks';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { stateSettingsSelectors } from './stateSettings.selectors';
import {
  StateSettingsGetProfileRequestAction,
  StateSettingsResetPasswordRequestAction,
  StateSettingsSignoutRequestAction,
  StateSettingsUpdatePartialReducerMetadataRequestAction,
} from './stateSettings.actionsTypes';
import { StateSettingsReducer } from './stateSettings.types';
import {
  createStateSettingsGetProfileRequestAction,
  createStateSettingsResetPasswordRequestAction,
  createStateSettingsSignoutRequestAction,
  createStateSettingsUpdatePartialReducerMetadataRequestAction,
  STATE_SETTINGS__GET_PROFILE__REQUEST_ID,
  STATE_SETTINGS__RESET_PASSWORD__REQUEST_ID,
  STATE_SETTINGS__SIGNOUT__REQUEST_ID,
} from './stateSettings.actionsCreators';

export const stateSettingsHooks = createReducerHooks(stateSettingsSelectors);

export const {
  useRequest: useStateSettingsRequest,
  useRequests: useStateSettingsRequests,
  useReducerMetadata: useStateSettingsReducerMetadata,
  useReducerConfig: useStateSettingsReducerConfig,
} = stateSettingsHooks;

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

export type ProfilePartialUnsavedValidator = NonNullable<
  StateSettingsReducer['metadata']['profilePartialUnsaved']
>;
export function useStateSettingsValidateProfilePartialUnsaved(): FormValidator<ProfilePartialUnsavedValidator> {
  const { profilePartialUnsaved } = useStateSettingsReducerMetadata();

  const [formErrors, setFormErrors] = useState<
    FormErrors<ProfilePartialUnsavedValidator>
  >({});

  const validateCallback = useCallback(
    async (fieldNames: (keyof ProfilePartialUnsavedValidator)[] = []) => {
      if (isNull(profilePartialUnsaved)) {
        return formErrors;
      }

      // const dto = Object.assign(
      //   new UsersUpdateOnePartialDto(),
      //   profilePartialUnsaved,
      // );
      // const formErrorsClean = await validateDto<ProfilePartialUnsavedValidator>(
      //   dto,
      //   formErrors,
      //   fieldNames,
      // );

      const formErrorsTemp: FormErrors<ProfilePartialUnsavedValidator> = {
        ...formErrors,
      };

      if (
        !isUndefined(profilePartialUnsaved.email) &&
        (_isEmpty(fieldNames) || fieldNames.includes('email'))
      ) {
        const fieldErrors: string[] = [];

        if (isEmpty(profilePartialUnsaved.email)) {
          fieldErrors.push('Enter email');
        } else if (!isEmail(profilePartialUnsaved.email)) {
          fieldErrors.push('Enter valid email');
        }

        formErrorsTemp.email = fieldErrors;
      }

      const formErrorsClean: FormErrors<ProfilePartialUnsavedValidator> =
        pickBy(formErrorsTemp, (fieldErrors) => fieldErrors.length > 0);

      setFormErrors(formErrorsClean);
      return formErrorsClean;
    },
    [profilePartialUnsaved, formErrors],
  );

  return {
    formErrors,
    validateCallback,
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
