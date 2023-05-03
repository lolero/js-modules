import {
  createReducerHooks,
  Request,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useCallback, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import keys from 'lodash/keys';
import { stateShoppingCartSelectors } from './stateShoppingCart.selectors';
import {
  StateShoppingCartAddItemRequestAction,
  StateShoppingCartRemoveItemRequestAction,
} from './stateShoppingCart.actionsTypes';
import { StateShoppingCartReducer } from './stateShoppingCart.types';
import {
  createStateShoppingCartAddItemRequestAction,
  createStateShoppingCartRemoveItemRequestAction,
} from './stateShoppingCart.actionsCreators';
import { useStateMainReducerMetadata } from '../stateMain/stateMain.hooks';
import { useNodeProductsEntities } from '../../entityData/nodeProducts/nodeProducts.hooks';

export const stateShoppingCartHooks = createReducerHooks(
  stateShoppingCartSelectors,
);

export const {
  useRequest: useStateShoppingCartRequest,
  useRequests: useStateShoppingCartRequests,
  useReducerMetadata: useStateShoppingCartReducerMetadata,
  useReducerConfig: useStateShoppingCartReducerConfig,
} = stateShoppingCartHooks;

export function useStateShoppingCartIsPendingPurchases(): boolean {
  const { pendingPurchases } = useStateShoppingCartReducerMetadata();

  const isPendingPurchases = useMemo(() => {
    return !isEmpty(pendingPurchases);
  }, [pendingPurchases]);

  return isPendingPurchases;
}

export function useStateShoppingCartRemainingBalance(): number {
  const { myBalance } = useStateMainReducerMetadata();
  const { pendingPurchases } = useStateShoppingCartReducerMetadata();
  const nodeProducts = useNodeProductsEntities();

  const remainingBalance = useMemo(() => {
    const pendingPurchasesSum = keys(pendingPurchases).reduce(
      (pendingPurchasesSumTemp, nodeProductPk) => {
        const pendingPurchase = pendingPurchases[nodeProductPk];
        const nodeProduct = nodeProducts[nodeProductPk];
        return (
          pendingPurchasesSumTemp +
          (nodeProduct?.cost ?? 0) * pendingPurchase.quantity
        );
      },
      0,
    );

    return (myBalance ?? 0) - pendingPurchasesSum;
  }, [myBalance, nodeProducts, pendingPurchases]);

  return remainingBalance;
}

export function useStateShoppingCartAddItem(): UseRequestReducerMetadata<
  StateShoppingCartAddItemRequestAction['requestMetadata'],
  StateShoppingCartReducer['metadata'],
  (
    nodeProductPk: StateShoppingCartAddItemRequestAction['requestMetadata']['nodeProductPk'],
  ) => void
> {
  const dispatch = useDispatch();
  const stateShoppingCartReducerMetadata =
    useStateShoppingCartReducerMetadata();
  const stateShoppingCartRequests = useStateShoppingCartRequests();
  const [
    stateShoppingCartAddItemRequestId,
    setStateShoppingCartAddItemRequestId,
  ] = useState('');
  const stateShoppingCartAddItemRequest = stateShoppingCartRequests[
    stateShoppingCartAddItemRequestId
  ] as Request<StateShoppingCartAddItemRequestAction['requestMetadata']>;

  const stateShoppingCartAddItemCallback = useCallback(
    (
      nodeProductPk: StateShoppingCartAddItemRequestAction['requestMetadata']['nodeProductPk'],
    ) => {
      const stateShoppingCartAddItemAction =
        createStateShoppingCartAddItemRequestAction(nodeProductPk);
      setStateShoppingCartAddItemRequestId(
        stateShoppingCartAddItemAction.requestId,
      );
      dispatch(stateShoppingCartAddItemAction);
    },
    [dispatch],
  );

  return {
    request: stateShoppingCartAddItemRequest,
    reducerMetadata: stateShoppingCartReducerMetadata,
    callback: stateShoppingCartAddItemCallback,
  };
}

export function useStateShoppingCartRemoveItem(): UseRequestReducerMetadata<
  StateShoppingCartRemoveItemRequestAction['requestMetadata'],
  StateShoppingCartReducer['metadata'],
  (
    nodeProductPk: StateShoppingCartRemoveItemRequestAction['requestMetadata']['nodeProductPk'],
  ) => void
> {
  const dispatch = useDispatch();
  const stateShoppingCartReducerMetadata =
    useStateShoppingCartReducerMetadata();
  const stateShoppingCartRequests = useStateShoppingCartRequests();
  const [
    stateShoppingCartRemoveItemRequestId,
    setStateShoppingCartRemoveItemRequestId,
  ] = useState('');
  const stateShoppingCartRemoveItemRequest = stateShoppingCartRequests[
    stateShoppingCartRemoveItemRequestId
  ] as Request<StateShoppingCartRemoveItemRequestAction['requestMetadata']>;

  const stateShoppingCartRemoveItemCallback = useCallback(
    (
      nodeProductPk: StateShoppingCartRemoveItemRequestAction['requestMetadata']['nodeProductPk'],
    ) => {
      const stateShoppingCartRemoveItemAction =
        createStateShoppingCartRemoveItemRequestAction(nodeProductPk);
      setStateShoppingCartRemoveItemRequestId(
        stateShoppingCartRemoveItemAction.requestId,
      );
      dispatch(stateShoppingCartRemoveItemAction);
    },
    [dispatch],
  );

  return {
    request: stateShoppingCartRemoveItemRequest,
    reducerMetadata: stateShoppingCartReducerMetadata,
    callback: stateShoppingCartRemoveItemCallback,
  };
}
