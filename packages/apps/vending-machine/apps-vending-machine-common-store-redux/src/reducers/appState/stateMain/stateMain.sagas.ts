import {
  call,
  CallEffect,
  ForkEffect,
  put,
  all,
  PutEffect,
  AllEffect,
  takeEvery,
  select,
  SelectEffect,
} from 'redux-saga/effects';
import keys from 'lodash/keys';
import { UsersDtoPurchase } from '@js-modules/apps-vending-machine-api-core-modules';
import { createStateShoppingCartUpdatePartialReducerMetadataRequestAction } from '../stateShoppingCart/stateShoppingCart.actionsCreators';
import { StateShoppingCartReducer } from '../stateShoppingCart/stateShoppingCart.types';
import { selectStateShoppingCartMetadata } from '../stateShoppingCart/stateShoppingCart.selectors';
import { NodeProductsReducer } from '../../entityData/nodeProducts/nodeProducts.types';
import {
  StateMainResetRequestAction,
  StateMainActionTypes,
  StateMainDepositRequestAction,
  StateMainGetMyBalanceRequestAction,
  StateMainPurchaseRequestAction,
  StateMainUpdatePartialReducerMetadataRequestAction,
} from './stateMain.actionsTypes';
import {
  createStateMainDepositFailAction,
  createStateMainDepositSuccessAction,
  createStateMainGetMyBalanceFailAction,
  createStateMainGetMyBalanceSuccessAction,
  createStateMainPurchaseFailAction,
  createStateMainPurchaseSuccessAction,
  createStateMainResetFailAction,
  createStateMainResetSuccessAction,
  createStateMainUpdatePartialReducerMetadataFailAction,
  createStateMainUpdatePartialReducerMetadataSuccessAction,
} from './stateMain.actionsCreators';
import {
  StateMainDepositServiceResponse,
  StateMainGetMyBalanceServiceResponse,
  StateMainPurchaseServiceResponse,
  StateMainResetServiceResponse,
} from './stateMain.servicesTypes';
import {
  stateMainDepositService,
  stateMainGetMyBalanceService,
  stateMainPurchaseService,
  stateMainResetService,
} from './stateMain.services';
import { normalizeNodeProductsRawArray } from '../../entityData/nodeProducts/nodeProducts.normalizer';
import { createNodeProductsGetManySuccessAction } from '../../entityData/nodeProducts/nodeProducts.actionsCreators';

export function* stateMainUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateMainUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createStateMainUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateMainUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateMainGetMyBalanceSaga({
  requestId,
}: StateMainGetMyBalanceRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  StateMainGetMyBalanceServiceResponse
> {
  try {
    const { data: myBalance, status: statusCode } = (yield call(
      stateMainGetMyBalanceService,
    )) as StateMainGetMyBalanceServiceResponse;

    yield put(
      createStateMainGetMyBalanceSuccessAction(
        {
          myBalance,
          change: null,
          purchasedProductPks: null,
        },
        requestId,
        statusCode,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateMainGetMyBalanceFailAction(err.message, requestId));
  }
}

export function* stateMainDepositSaga({
  requestMetadata,
  requestId,
}: StateMainDepositRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  StateMainDepositServiceResponse
> {
  const { amount } = requestMetadata;

  try {
    const {
      data: { balance: myBalance },
      status: statusCode,
    } = (yield call(
      stateMainDepositService,
      amount,
    )) as StateMainDepositServiceResponse;

    yield put(
      createStateMainDepositSuccessAction(
        {
          myBalance,
          change: null,
          purchasedProductPks: null,
        },
        requestId,
        statusCode,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateMainDepositFailAction(err.message, requestId));
  }
}

export function* stateMainPurchaseSaga({
  requestId,
}: StateMainPurchaseRequestAction): Generator<
  SelectEffect | CallEffect | AllEffect<PutEffect> | PutEffect,
  void,
  StateMainPurchaseServiceResponse | NodeProductsReducer['data']
> {
  const { pendingPurchases } = (yield select(
    selectStateShoppingCartMetadata,
  )) as StateShoppingCartReducer['metadata'];

  const purchases = keys(pendingPurchases).reduce(
    (usersDtoPurchaseTemp: UsersDtoPurchase['purchases'], nodeProductPk) => {
      const usersDtoPurchaseTempNew: UsersDtoPurchase['purchases'] = {
        ...usersDtoPurchaseTemp,
        [nodeProductPk]: {
          productId: Number(nodeProductPk),
          quantity: pendingPurchases[nodeProductPk].quantity,
        },
      };
      return usersDtoPurchaseTempNew;
    },
    {},
  );

  try {
    const {
      data: { products: nodeProductsRawArray, balance: myBalance, change },
      status: statusCode,
    } = (yield call(stateMainPurchaseService, {
      purchases,
    })) as StateMainPurchaseServiceResponse;

    const normalizedNodeProducts = (yield call(
      normalizeNodeProductsRawArray,
      nodeProductsRawArray,
    )) as NodeProductsReducer['data'];

    yield all([
      put(
        createStateMainPurchaseSuccessAction(
          {
            myBalance,
            change,
            purchasedProductPks: keys(normalizedNodeProducts),
          },
          requestId,
          statusCode,
        ),
      ),
      put(
        createStateShoppingCartUpdatePartialReducerMetadataRequestAction({
          pendingPurchases: {},
        }),
      ),
      put(
        createNodeProductsGetManySuccessAction(
          normalizedNodeProducts,
          requestId,
          statusCode,
          false,
        ),
      ),
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateMainPurchaseFailAction(err.message, requestId));
  }
}

export function* stateMainResetSaga({
  requestId,
}: StateMainResetRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  StateMainResetServiceResponse
> {
  try {
    const {
      data: { balance: myBalance, change },
      status: statusCode,
    } = (yield call(stateMainResetService)) as StateMainResetServiceResponse;

    yield put(
      createStateMainResetSuccessAction(
        {
          myBalance,
          change,
          purchasedProductPks: null,
        },
        requestId,
        statusCode,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateMainResetFailAction(err.message, requestId));
  }
}

export function* stateMainSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    stateMainUpdatePartialReducerMetadataSaga,
  );
  yield takeEvery(
    StateMainActionTypes.STATE_MAIN__GET_MY_BALANCE__REQUEST,
    stateMainGetMyBalanceSaga,
  );
  yield takeEvery(
    StateMainActionTypes.STATE_MAIN__DEPOSIT__REQUEST,
    stateMainDepositSaga,
  );
  yield takeEvery(
    StateMainActionTypes.STATE_MAIN__PURCHASE__REQUEST,
    stateMainPurchaseSaga,
  );
  yield takeEvery(
    StateMainActionTypes.STATE_MAIN__RESET__REQUEST,
    stateMainResetSaga,
  );
}
