import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { ProductsDtoUpdateOneWhole } from '@js-modules/apps-vending-machine-api-core-modules';
import { destructNodeProductPk } from './nodeProducts.pkUtils';
import { NodeProductsReducer } from './nodeProducts.types';
import {
  NodeProductsActionTypes,
  NodeProductsCreateOneRequestAction,
  NodeProductsDeleteOneRequestAction,
  NodeProductsGetManyRequestAction,
  NodeProductsUpdateOneWholeRequestAction,
  NodeProductsUpdatePartialReducerMetadataRequestAction,
} from './nodeProducts.actionsTypes';
import {
  createNodeProductsCreateOneFailAction,
  createNodeProductsCreateOneSuccessAction,
  createNodeProductsDeleteOneFailAction,
  createNodeProductsDeleteOneSuccessAction,
  createNodeProductsGetManyFailAction,
  createNodeProductsGetManySuccessAction,
  createNodeProductsUpdateOneWholeFailAction,
  createNodeProductsUpdateOneWholeSuccessAction,
  createNodeProductsUpdatePartialReducerMetadataFailAction,
  createNodeProductsUpdatePartialReducerMetadataSuccessAction,
} from './nodeProducts.actionsCreators';
import {
  NodeProductsCreateOneServiceResponse,
  NodeProductsDeleteOneServiceResponse,
  NodeProductsGetManyServiceResponse,
  NodeProductsUpdateOneWholeServiceResponse,
} from './nodeProducts.servicesTypes';
import {
  nodeProductsCreateOneService,
  nodeProductsDeleteOneService,
  nodeProductsGetManyService,
  nodeProductsUpdateOneWholeService,
} from './nodeProducts.services';
import {
  denormalizeNodeProducts,
  normalizeNodeProductsRawArray,
} from './nodeProducts.normalizer';

export function* nodeProductsUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: NodeProductsUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createNodeProductsUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createNodeProductsUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* nodeProductsCreateOneSaga({
  requestMetadata,
  requestId,
}: NodeProductsCreateOneRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeProductsCreateOneServiceResponse | NodeProductsReducer['data']
> {
  const { entity } = requestMetadata;

  try {
    const { data: nodeProductRaw, status: statusCode } = (yield call(
      nodeProductsCreateOneService,
      entity,
    )) as NodeProductsCreateOneServiceResponse;

    const normalizedNodeProducts = (yield call(normalizeNodeProductsRawArray, [
      nodeProductRaw,
    ])) as NodeProductsReducer['data'];

    yield put(
      createNodeProductsCreateOneSuccessAction(
        normalizedNodeProducts,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createNodeProductsCreateOneFailAction(err.message, requestId));
  }
}

export function* nodeProductsGetManySaga({
  requestMetadata,
  requestId,
}: NodeProductsGetManyRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeProductsGetManyServiceResponse | NodeProductsReducer['data']
> {
  const { sellerKeycloakId } = requestMetadata;

  try {
    const { data: nodeProductsRawArray, status: statusCode } = (yield call(
      nodeProductsGetManyService,
      sellerKeycloakId,
    )) as NodeProductsGetManyServiceResponse;

    const normalizedNodeProducts = (yield call(
      normalizeNodeProductsRawArray,
      nodeProductsRawArray,
    )) as NodeProductsReducer['data'];

    yield put(
      createNodeProductsGetManySuccessAction(
        normalizedNodeProducts,
        requestId,
        statusCode,
        true,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createNodeProductsGetManyFailAction(err.message, requestId));
  }
}

export function* nodeProductsUpdateOneWholeSaga({
  requestMetadata,
  requestId,
}: NodeProductsUpdateOneWholeRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  | ProductsDtoUpdateOneWhole[]
  | NodeProductsUpdateOneWholeServiceResponse
  | NodeProductsReducer['data']
> {
  const { entityPk, entity } = requestMetadata;

  const denormalizedNodeProducts = (yield call(denormalizeNodeProducts, {
    [entityPk]: entity,
  })) as ProductsDtoUpdateOneWhole[];

  try {
    const { data: nodeProductRaw, status: statusCode } = (yield call(
      nodeProductsUpdateOneWholeService,
      denormalizedNodeProducts[0],
    )) as NodeProductsUpdateOneWholeServiceResponse;

    const normalizedNodeProducts = (yield call(normalizeNodeProductsRawArray, [
      nodeProductRaw,
    ])) as NodeProductsReducer['data'];

    yield put(
      createNodeProductsUpdateOneWholeSuccessAction(
        normalizedNodeProducts,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(
      createNodeProductsUpdateOneWholeFailAction(err.message, requestId),
    );
  }
}

export function* nodeProductsDeleteOneSaga({
  requestMetadata,
  requestId,
}: NodeProductsDeleteOneRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeProductsDeleteOneServiceResponse | NodeProductsReducer['data']
> {
  const { entityPk } = requestMetadata;

  try {
    const { status: statusCode } = (yield call(
      nodeProductsDeleteOneService,
      Number(destructNodeProductPk(entityPk).fields.id),
    )) as NodeProductsDeleteOneServiceResponse;

    yield put(
      createNodeProductsDeleteOneSuccessAction(
        [entityPk],
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createNodeProductsDeleteOneFailAction(err.message, requestId));
  }
}

export function* nodeProductsSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    nodeProductsUpdatePartialReducerMetadataSaga,
  );
  yield takeLatest(
    NodeProductsActionTypes.NODE_PRODUCTS__CREATE_ONE__REQUEST,
    nodeProductsCreateOneSaga,
  );
  yield takeLatest(
    NodeProductsActionTypes.NODE_PRODUCTS__GET_MANY__REQUEST,
    nodeProductsGetManySaga,
  );
  yield takeLatest(
    NodeProductsActionTypes.NODE_PRODUCTS__UPDATE_ONE_WHOLE__REQUEST,
    nodeProductsUpdateOneWholeSaga,
  );
  yield takeLatest(
    NodeProductsActionTypes.NODE_PRODUCTS__DELETE_ONE__REQUEST,
    nodeProductsDeleteOneSaga,
  );
}
