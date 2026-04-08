import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import type {
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { createStateMainUpdatePartialReducerMetadataRequestAction } from './stateMain.actions.creators';
import type { StateMainUpdatePartialReducerMetadataRequestAction } from './stateMain.actions.types';
import {
  useStateMainReducerMetadata,
  useStateMainRequest,
} from './stateMain.hooks';
import type { StateMainReducer } from './stateMain.types';

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
