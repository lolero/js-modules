import {
  createReducerHooks,
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { stateMainSelectors } from './stateMain.selectors';
import { StateMainUpdatePartialReducerMetadataRequestAction } from './stateMain.actionsTypes';
import { StateMainReducer } from './stateMain.types';
import { createStateMainUpdatePartialReducerMetadataRequestAction } from './stateMain.actionsCreators';

export const stateMainHooks = createReducerHooks(stateMainSelectors);

export const {
  useRequest: useStateMainRequest,
  useRequests: useStateMainRequests,
  useReducerMetadata: useStateMainReducerMetadata,
  useReducerConfig: useStateMainReducerConfig,
} = stateMainHooks;

export function useStateMainUpdatePartialReducerMetadata(): UseRequestReducerMetadata<
  StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata'],
  StateMainReducer['metadata'],
  (
    partialReducerMetadata: StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useStateMainRequest(requestId) as Request<
    StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']
  >;
  const reducerMetadata = useStateMainReducerMetadata();

  const callback = useCallback(
    (
      partialReducerMetadata: StateMainUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
    ) => {
      const action = createStateMainUpdatePartialReducerMetadataRequestAction(
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
