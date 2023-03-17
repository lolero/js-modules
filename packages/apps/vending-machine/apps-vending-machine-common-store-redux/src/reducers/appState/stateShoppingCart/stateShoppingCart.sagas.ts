import {
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  select,
  takeEvery,
} from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import { selectStateShoppingCartMetadata } from './stateShoppingCart.selectors';
import {
  StateShoppingCartActionTypes,
  StateShoppingCartAddItemRequestAction,
  StateShoppingCartUpdatePartialReducerMetadataRequestAction,
  StateShoppingCartRemoveItemRequestAction,
} from './stateShoppingCart.actionsTypes';
import {
  createStateShoppingCartAddItemSuccessAction,
  createStateShoppingCartRemoveItemSuccessAction,
  createStateShoppingCartUpdatePartialReducerMetadataFailAction,
  createStateShoppingCartUpdatePartialReducerMetadataSuccessAction,
} from './stateShoppingCart.actionsCreators';
import { StateShoppingCartReducer } from './stateShoppingCart.types';

export function* stateShoppingCartUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateShoppingCartUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createStateShoppingCartUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateShoppingCartUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateShoppingCartAddItemSaga({
  requestMetadata,
  requestId,
}: StateShoppingCartAddItemRequestAction): Generator<
  SelectEffect | PutEffect,
  void,
  StateShoppingCartReducer['metadata']
> {
  const { nodeProductPk } = requestMetadata;

  const { pendingPurchases } = (yield select(
    selectStateShoppingCartMetadata,
  )) as StateShoppingCartReducer['metadata'];

  const pendingPurchasesNew = cloneDeep(pendingPurchases);

  if (!pendingPurchasesNew[nodeProductPk]) {
    pendingPurchasesNew[nodeProductPk] = {
      quantity: 1,
    };
  } else {
    pendingPurchasesNew[nodeProductPk].quantity += 1;
  }

  yield put(
    createStateShoppingCartAddItemSuccessAction(
      {
        pendingPurchases: pendingPurchasesNew,
      },
      requestId,
    ),
  );
}

export function* stateShoppingCartRemoveItemSaga({
  requestMetadata,
  requestId,
}: StateShoppingCartRemoveItemRequestAction): Generator<
  SelectEffect | PutEffect,
  void,
  StateShoppingCartReducer['metadata']
> {
  const { nodeProductPk } = requestMetadata;

  const { pendingPurchases } = (yield select(
    selectStateShoppingCartMetadata,
  )) as StateShoppingCartReducer['metadata'];

  const pendingPurchasesNew = cloneDeep(pendingPurchases);

  if (pendingPurchasesNew[nodeProductPk].quantity <= 1) {
    delete pendingPurchasesNew[nodeProductPk];
  } else {
    pendingPurchasesNew[nodeProductPk].quantity -= 1;
  }

  yield put(
    createStateShoppingCartRemoveItemSuccessAction(
      {
        pendingPurchases: pendingPurchasesNew,
      },
      requestId,
    ),
  );
}

export function* stateShoppingCartSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    StateShoppingCartActionTypes.STATE_SHOPPING_CART__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    stateShoppingCartUpdatePartialReducerMetadataSaga,
  );
  yield takeEvery(
    StateShoppingCartActionTypes.STATE_SHOPPING_CART__ADD_ITEM__REQUEST,
    stateShoppingCartAddItemSaga,
  );
  yield takeEvery(
    StateShoppingCartActionTypes.STATE_SHOPPING_CART__REMOVE_ITEM__REQUEST,
    stateShoppingCartRemoveItemSaga,
  );
}
