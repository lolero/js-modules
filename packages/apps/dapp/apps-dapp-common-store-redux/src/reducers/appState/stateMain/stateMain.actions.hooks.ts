import { useCallback, useState } from 'react';
import {
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { StateMainUpdatePartialReducerMetadataRequestAction } from './stateMain.actions.types';
import { StateMainReducer } from './stateMain.types';
import { createStateMainUpdatePartialReducerMetadataRequestAction } from './stateMain.actions.creators';
import {
  useStateMainReducerMetadata,
  useStateMainRequest,
} from './stateMain.hooks';

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
