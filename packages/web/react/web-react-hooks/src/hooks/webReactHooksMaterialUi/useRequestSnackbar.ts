import {
  ReducerMetadata,
  Request,
  RequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import React, { useEffect } from 'react';
import { usePrevious } from '@js-modules/common-react-hooks';
import { SnackbarMessageMetadata } from './useSnackPackUtils';

export type SnackbarMessage = { success: string; error: string };

export function useRequestSnackbar<ReducerMetadataT extends ReducerMetadata>(
  request: Request<RequestMetadata> | undefined,
  message: SnackbarMessage,
  setSnackPack: React.Dispatch<React.SetStateAction<SnackbarMessageMetadata[]>>,
  icon?: JSX.Element,
  resetRequestIdsCallback?: (
    partialReducerMetadata: Partial<ReducerMetadataT>,
  ) => void,
  resetRequestIdsPartialReducerMetadata?: Partial<ReducerMetadataT>,
): void {
  const requestPrevious = usePrevious(request);

  useEffect(() => {
    if (requestPrevious?.isPending && !request?.isPending) {
      const snackbarMessageMetadata: SnackbarMessageMetadata = {
        unixMilliseconds: new Date().getTime(),
        message: request?.isOk ? message.success : message.error,
        severity: request?.isOk ? 'success' : 'error',
        icon,
      };

      setSnackPack((prev) => [...prev, snackbarMessageMetadata]);

      if (resetRequestIdsCallback && resetRequestIdsPartialReducerMetadata) {
        resetRequestIdsCallback(resetRequestIdsPartialReducerMetadata);
      }
    }
  }, [
    icon,
    message.error,
    message.success,
    request?.isOk,
    request?.isPending,
    requestPrevious?.isPending,
    resetRequestIdsCallback,
    resetRequestIdsPartialReducerMetadata,
    setSnackPack,
  ]);
}
