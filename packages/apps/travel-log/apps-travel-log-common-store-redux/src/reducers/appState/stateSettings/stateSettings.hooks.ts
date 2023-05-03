import {
  Request,
  createReducerHooks,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';
import { validate } from 'class-validator';
import debounce from 'lodash/debounce';
import { stateSettingsSelectors } from './stateSettings.selectors';
import { StateSettingsUpdatePartialReducerMetadataRequestAction } from './stateSettings.actionsTypes';
import { StateSettingsReducer } from './stateSettings.types';
import { createStateSettingsUpdatePartialReducerMetadataRequestAction } from './stateSettings.actionsCreators';

export const stateSettingsHooks = createReducerHooks(stateSettingsSelectors);

export const {
  useRequest: useStateSettingsRequest,
  useRequests: useStateSettingsRequests,
  useReducerMetadata: useStateSettingsReducerMetadata,
  useReducerConfig: useStateSettingsReducerConfig,
} = stateSettingsHooks;

export function useStateSettingsUpdateProfilePartialUnsaved(): UseRequestReducerMetadata<
  StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata'],
  StateSettingsReducer['metadata'],
  (
    usersUpdateOnePartialDtoPartial: Partial<UsersUpdateOnePartialDto> | null,
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useStateSettingsRequest(requestId) as Request<
    StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata']
  >;
  const reducerMetadata = useStateSettingsReducerMetadata();
  const { profilePartialUnsaved } = reducerMetadata;

  const callback = useCallback(
    (
      usersUpdateOnePartialDtoPartial: Partial<UsersUpdateOnePartialDto> | null,
    ) => {
      const usersUpdateOnePartialDto: UsersUpdateOnePartialDto = {
        ...profilePartialUnsaved,
        ...usersUpdateOnePartialDtoPartial,
      };
      const updateProfilePartialUnsavedAction =
        createStateSettingsUpdatePartialReducerMetadataRequestAction({
          profilePartialUnsaved: usersUpdateOnePartialDto,
        });
      setRequestId(updateProfilePartialUnsavedAction.requestId);
      dispatch(updateProfilePartialUnsavedAction);
    },
    [dispatch, profilePartialUnsaved],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(callback, 500), [callback]);

  return {
    request,
    reducerMetadata,
    callback: debouncedCallback,
  };
}

export function useStateSettingsValidateProfilePartialUnsaved(): UseRequestReducerMetadata<
  StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata'],
  StateSettingsReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useStateSettingsRequest(requestId) as Request<
    StateSettingsUpdatePartialReducerMetadataRequestAction['requestMetadata']
  >;
  const reducerMetadata = useStateSettingsReducerMetadata();
  const { profilePartialUnsaved } = reducerMetadata;

  const callback = useCallback(async () => {
    if (!profilePartialUnsaved) {
    }

    // TODO: sort out how to use class-validator from the front end
    // const usersUpdateOnePartialDto = new UsersUpdateOnePartialDto();
    // Object.assign(usersUpdateOnePartialDto, profilePartialUnsaved);
    // const profilePartialUnsavedErrors = await validate(
    //   usersUpdateOnePartialDto,
    // );

    // const validateProfilePartialUnsavedAction =
    //   createStateSettingsUpdatePartialReducerMetadataRequestAction({
    //     profilePartialUnsavedErrors,
    //   });
    // setRequestId(validateProfilePartialUnsavedAction.requestId);
    // dispatch(validateProfilePartialUnsavedAction);
  }, [profilePartialUnsaved]);

  return {
    request,
    reducerMetadata,
    callback,
  };
}
