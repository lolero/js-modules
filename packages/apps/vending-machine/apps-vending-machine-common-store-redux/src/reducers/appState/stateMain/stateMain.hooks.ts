import {
  createReducerHooks,
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { stateMainSelectors } from './stateMain.selectors';
import {
  StateMainDepositRequestAction,
  StateMainGetMyBalanceRequestAction,
  StateMainPurchaseRequestAction,
  StateMainResetRequestAction,
} from './stateMain.actionsTypes';
import { StateMainReducer } from './stateMain.types';
import {
  createStateMainDepositRequestAction,
  createStateMainGetMyBalanceRequestAction,
  createStateMainPurchaseRequestAction,
  createStateMainResetRequestAction,
} from './stateMain.actionsCreators';

export const stateMainHooks = createReducerHooks(stateMainSelectors);

export const {
  useRequest: useStateMainRequest,
  useRequests: useStateMainRequests,
  useReducerMetadata: useStateMainReducerMetadata,
  useReducerConfig: useStateMainReducerConfig,
} = stateMainHooks;

export function useStateMainGetMyBalance(): UseRequestReducerMetadata<
  StateMainGetMyBalanceRequestAction['requestMetadata'],
  StateMainReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const stateMainReducerMetadata = useStateMainReducerMetadata();
  const stateMainRequests = useStateMainRequests();
  const [getMyBalanceRequestId, setGetMyBalanceRequestId] = useState('');
  const getMyBalanceRequest = stateMainRequests[
    getMyBalanceRequestId
  ] as Request<StateMainGetMyBalanceRequestAction['requestMetadata']>;

  const getMyBalanceCallback = useCallback(() => {
    if (getMyBalanceRequestId) {
      return;
    }

    const getMyBalanceAction = createStateMainGetMyBalanceRequestAction();
    setGetMyBalanceRequestId(getMyBalanceAction.requestId);
    dispatch(getMyBalanceAction);
  }, [dispatch, getMyBalanceRequestId]);

  return {
    request: getMyBalanceRequest,
    reducerMetadata: stateMainReducerMetadata,
    callback: getMyBalanceCallback,
  };
}

export function useStateMainDeposit(): UseRequestReducerMetadata<
  StateMainDepositRequestAction['requestMetadata'],
  StateMainReducer['metadata'],
  (amount: number) => void
> {
  const dispatch = useDispatch();
  const stateMainReducerMetadata = useStateMainReducerMetadata();
  const stateMainRequests = useStateMainRequests();
  const [depositRequestId, setDepositRequestId] = useState('');
  const depositRequest = stateMainRequests[
    depositRequestId
  ] as unknown as Request<StateMainDepositRequestAction['requestMetadata']>;

  const depositCallback = useCallback(
    (amount: number) => {
      const depositAction = createStateMainDepositRequestAction(amount);
      setDepositRequestId(depositAction.requestId);
      dispatch(depositAction);
    },
    [dispatch],
  );

  return {
    request: depositRequest,
    reducerMetadata: stateMainReducerMetadata,
    callback: depositCallback,
  };
}

export function useStateMainPurchase(): UseRequestReducerMetadata<
  StateMainPurchaseRequestAction['requestMetadata'],
  StateMainReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const stateMainReducerMetadata = useStateMainReducerMetadata();
  const stateMainRequests = useStateMainRequests();
  const [purchaseRequestId, setPurchaseRequestId] = useState('');
  const purchaseRequest = stateMainRequests[
    purchaseRequestId
  ] as unknown as Request<StateMainPurchaseRequestAction['requestMetadata']>;

  const purchaseCallback = useCallback(() => {
    const purchaseAction = createStateMainPurchaseRequestAction();
    setPurchaseRequestId(purchaseAction.requestId);
    dispatch(purchaseAction);
  }, [dispatch]);

  return {
    request: purchaseRequest,
    reducerMetadata: stateMainReducerMetadata,
    callback: purchaseCallback,
  };
}

export function useStateMainReset(): UseRequestReducerMetadata<
  StateMainResetRequestAction['requestMetadata'],
  StateMainReducer['metadata'],
  () => void
> {
  const dispatch = useDispatch();
  const stateMainReducerMetadata = useStateMainReducerMetadata();
  const stateMainRequests = useStateMainRequests();
  const [resetRequestId, setResetRequestId] = useState('');
  const resetRequest = stateMainRequests[resetRequestId] as unknown as Request<
    StateMainResetRequestAction['requestMetadata']
  >;

  const resetCallback = useCallback(() => {
    const resetAction = createStateMainResetRequestAction();
    setResetRequestId(resetAction.requestId);
    dispatch(resetAction);
  }, [dispatch]);

  return {
    request: resetRequest,
    reducerMetadata: stateMainReducerMetadata,
    callback: resetCallback,
  };
}
