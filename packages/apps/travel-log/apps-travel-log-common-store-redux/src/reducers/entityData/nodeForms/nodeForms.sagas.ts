import {
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import { NodeFormsReducer } from './nodeForms.types';
import {
  NodeFormsActionTypes,
  NodeFormsGetManyRequestAction,
  NodeFormsGetOneRequestAction,
  NodeFormsUpdateOnePartialRequestAction,
} from './nodeForms.actionsTypes';
import {
  createNodeFormsGetManyFailAction,
  createNodeFormsGetManySuccessAction,
  createNodeFormsGetOneFailAction,
  createNodeFormsGetOneSuccessAction,
  createNodeFormsUpdateOnePartialFailAction,
  createNodeFormsUpdateOnePartialSuccessAction,
} from './nodeForms.actionsCreators';
import {
  NodeFormsGetManyServiceResponse,
  NodeFormsGetOneServiceResponse,
} from './nodeForms.servicesTypes';
import {
  nodeFormsGetManyService,
  nodeFormsGetOneService,
} from './nodeForms.services';
import { normalizeUsersPublicDtoArray } from './nodeForms.normalizer';

export function* nodeFormsUpdateOnePartialSaga({
  requestMetadata,
  requestId,
}: NodeFormsUpdateOnePartialRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeFormsUpdateOnePartialServiceResponse | NodeFormsReducer['data']
> {
  const { nodeFormPk, nodeFormPartial } = requestMetadata;

  try {
    const { data: usersPublicDto, status: statusCode } = (yield call(
      nodeFormsUpdateOnePartialService,
      uniqueKeyValue,
      uniqueKeyName,
    )) as NodeFormsUpdateOnePartialServiceResponse;

    const normalizedNodeForms = (yield call(normalizeUsersPublicDtoArray, [
      usersPublicDto,
    ])) as NodeFormsReducer['data'];

    yield put(
      createNodeFormsUpdateOnePartialSuccessAction(
        normalizedNodeForms,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeFormsUpdateOnePartialFailAction(err.message, requestId),
    );
  }
}

export function* nodeFormsGetOneSaga({
  requestMetadata,
  requestId,
}: NodeFormsGetOneRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeFormsGetOneServiceResponse | NodeFormsReducer['data']
> {
  const { uniqueKeyValue, uniqueKeyName } = requestMetadata;

  try {
    const { data: usersPublicDto, status: statusCode } = (yield call(
      nodeFormsGetOneService,
      uniqueKeyValue,
      uniqueKeyName,
    )) as NodeFormsGetOneServiceResponse;

    const normalizedNodeForms = (yield call(normalizeUsersPublicDtoArray, [
      usersPublicDto,
    ])) as NodeFormsReducer['data'];

    yield put(
      createNodeFormsGetOneSuccessAction(
        normalizedNodeForms,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeFormsGetOneFailAction(err.message, requestId));
  }
}

export function* nodeFormsGetManySaga({
  requestId,
}: NodeFormsGetManyRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeFormsGetManyServiceResponse | NodeFormsReducer['data']
> {
  try {
    const { data: usersPublicDtoArray, status: statusCode } = (yield call(
      nodeFormsGetManyService,
    )) as NodeFormsGetManyServiceResponse;

    const normalizedNodeForms = (yield call(
      normalizeUsersPublicDtoArray,
      usersPublicDtoArray,
    )) as NodeFormsReducer['data'];

    yield put(
      createNodeFormsGetManySuccessAction(
        normalizedNodeForms,
        requestId,
        statusCode,
        true,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeFormsGetManyFailAction(err.message, requestId));
  }
}

export function* nodeFormsSagas(): Generator<ForkEffect, void, void> {
  yield takeLatest(
    NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__REQUEST,
    nodeFormsUpdateOnePartialSaga,
  );
  yield takeLatest(
    NodeFormsActionTypes.NODE_FORMS__GET_ONE__REQUEST,
    nodeFormsGetOneSaga,
  );
  yield takeLatest(
    NodeFormsActionTypes.NODE_FORMS__GET_MANY__REQUEST,
    nodeFormsGetManySaga,
  );
}
