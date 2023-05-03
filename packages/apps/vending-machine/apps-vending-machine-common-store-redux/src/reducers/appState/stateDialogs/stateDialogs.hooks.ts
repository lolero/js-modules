import {
  createReducerHooks,
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { ConfirmDialogProps } from '@js-modules/web-react-components';
import { stateDialogsSelectors } from './stateDialogs.selectors';
import { StateDialogsReducer } from './stateDialogs.types';
import { StateDialogsUpdateWholeReducerMetadataRequestAction } from './stateDialogs.actionsTypes';
import { createStateDialogsUpdateWholeReducerMetadataRequestAction } from './stateDialogs.actionsCreators';

export const stateDialogsHooks = createReducerHooks(stateDialogsSelectors);

export const {
  useRequest: useStateDialogsRequest,
  useRequests: useStateDialogsRequests,
  useReducerMetadata: useStateDialogsReducerMetadata,
  useReducerConfig: useStateDialogsReducerConfig,
} = stateDialogsHooks;

export function useStateDialogsCloseAll(): UseRequestReducerMetadata<
  StateDialogsUpdateWholeReducerMetadataRequestAction['requestMetadata'],
  StateDialogsReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const stateDialogsReducerMetadata = useStateDialogsReducerMetadata();
  const stateDialogsRequests = useStateDialogsRequests();
  const [stateDialogsCloseAllRequestId, setStateDialogsCloseAllRequestId] =
    useState('');
  const stateDialogsCloseAllRequest = stateDialogsRequests[
    stateDialogsCloseAllRequestId
  ] as Request<
    StateDialogsUpdateWholeReducerMetadataRequestAction['requestMetadata']
  >;

  const stateDialogsCloseAllCallback = useCallback(() => {
    const stateDialogsCloseAllAction =
      createStateDialogsUpdateWholeReducerMetadataRequestAction({});
    setStateDialogsCloseAllRequestId(stateDialogsCloseAllAction.requestId);
    dispatch(stateDialogsCloseAllAction);
  }, [dispatch]);

  return {
    request: stateDialogsCloseAllRequest,
    reducerMetadata: stateDialogsReducerMetadata,
    callback: stateDialogsCloseAllCallback,
  };
}

export function useStateDialogsConfirmDialogOpen(): UseRequestReducerMetadata<
  StateDialogsUpdateWholeReducerMetadataRequestAction['requestMetadata'],
  StateDialogsReducer['metadata'],
  (confirmDialogProps: ConfirmDialogProps) => void
> {
  const dispatch = useDispatch();
  const stateDialogsReducerMetadata = useStateDialogsReducerMetadata();
  const stateDialogsRequests = useStateDialogsRequests();
  const [
    stateDialogsConfirmDialogOpenRequestId,
    setStateDialogsConfirmDialogOpenRequestId,
  ] = useState('');
  const stateDialogsConfirmDialogOpenRequest = stateDialogsRequests[
    stateDialogsConfirmDialogOpenRequestId
  ] as Request<
    StateDialogsUpdateWholeReducerMetadataRequestAction['requestMetadata']
  >;

  const stateDialogsConfirmDialogOpenCallback = useCallback(
    (confirmDialogProps: ConfirmDialogProps) => {
      const stateDialogsConfirmDialogOpenAction =
        createStateDialogsUpdateWholeReducerMetadataRequestAction({
          confirmDialogMetadata: confirmDialogProps,
        });
      setStateDialogsConfirmDialogOpenRequestId(
        stateDialogsConfirmDialogOpenAction.requestId,
      );
      dispatch(stateDialogsConfirmDialogOpenAction);
    },
    [dispatch],
  );

  return {
    request: stateDialogsConfirmDialogOpenRequest,
    reducerMetadata: stateDialogsReducerMetadata,
    callback: stateDialogsConfirmDialogOpenCallback,
  };
}
