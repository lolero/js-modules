import type React from 'react';
import { useEffect } from 'react';
import { usePrevious } from '@js-modules/common-react-utils';
import type {
  ReducerMetadata,
  Request,
  RequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { SnackbarMessageMetadata } from './useSnackPackUtils';

export type SnackbarMessage = { success: string; error: string };

/**
 * Queues a snackbar message when `request` transitions from pending to settled,
 * picking the success/error text and severity, and optionally resetting the
 * request ids afterwards.
 * @param request - The tracked request whose pending→settled transition fires the snackbar.
 * @param message - Success and error message strings.
 * @param setSnackPack - Setter that appends the message to the snackbar queue.
 * @param icon - Optional icon shown in the snackbar.
 * @param resetRequestIdsCallback - Optional callback to reset request ids after the snackbar shows.
 * @param resetRequestIdsPartialReducerMetadata - Partial reducer metadata passed to `resetRequestIdsCallback`.
 */
export function useRequestSnackbar<ReducerMetadataT extends ReducerMetadata>(
  request: Request<RequestMetadata> | undefined,
  message: SnackbarMessage,
  setSnackPack: React.Dispatch<React.SetStateAction<SnackbarMessageMetadata[]>>,
  icon?: React.ReactElement,
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
