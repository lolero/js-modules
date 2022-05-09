import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { createStateDialogsUpdateWholeReducerMetadataRequestAction } from '@js-modules/apps-segway-rental-store-redux';

/**
 * Get a callback function to dispatch an action which closes all open dialogs
 */
export function useCloseAllDialogsCallBack(): () => void {
  const dispatch = useDispatch();

  const closeAllDialogsCallback = useCallback(() => {
    const closeAllDialogsRequestAction =
      createStateDialogsUpdateWholeReducerMetadataRequestAction({});
    dispatch(closeAllDialogsRequestAction);
  }, [dispatch]);

  return closeAllDialogsCallback;
}
