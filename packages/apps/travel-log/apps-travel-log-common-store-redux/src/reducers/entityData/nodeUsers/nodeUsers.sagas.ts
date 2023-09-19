import {
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import { NodeUsersReducer } from './nodeUsers.types';
import {
  NodeUsersActionTypes,
  NodeUsersGetManyRequestAction,
  NodeUsersGetOneRequestAction,
} from './nodeUsers.actionsTypes';
import {
  createNodeUsersGetManyFailAction,
  createNodeUsersGetManySuccessAction,
  createNodeUsersGetOneFailAction,
  createNodeUsersGetOneSuccessAction,
} from './nodeUsers.actionsCreators';
import {
  NodeUsersGetManyServiceResponse,
  NodeUsersGetOneServiceResponse,
} from './nodeUsers.servicesTypes';
import {
  nodeUsersGetManyService,
  nodeUsersGetOneService,
} from './nodeUsers.services';
import { normalizeUsersPublicDtoArray } from './nodeUsers.normalizer';

export function* nodeUsersGetOneSaga({
  requestMetadata,
  requestId,
}: NodeUsersGetOneRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeUsersGetOneServiceResponse | NodeUsersReducer['data']
> {
  const { uniqueKeyValue, uniqueKeyName } = requestMetadata;

  try {
    const { data: usersPublicDto, status: statusCode } = (yield call(
      nodeUsersGetOneService,
      uniqueKeyValue,
      uniqueKeyName,
    )) as NodeUsersGetOneServiceResponse;

    const normalizedNodeUsers = (yield call(normalizeUsersPublicDtoArray, [
      usersPublicDto,
    ])) as NodeUsersReducer['data'];

    yield put(
      createNodeUsersGetOneSuccessAction(
        normalizedNodeUsers,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeUsersGetOneFailAction(err.message, requestId));
  }
}

export function* nodeUsersGetManySaga({
  requestId,
}: NodeUsersGetManyRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeUsersGetManyServiceResponse | NodeUsersReducer['data']
> {
  try {
    const { data: usersPublicDtoArray, status: statusCode } = (yield call(
      nodeUsersGetManyService,
    )) as NodeUsersGetManyServiceResponse;

    const normalizedNodeUsers = (yield call(
      normalizeUsersPublicDtoArray,
      usersPublicDtoArray,
    )) as NodeUsersReducer['data'];

    yield put(
      createNodeUsersGetManySuccessAction(
        normalizedNodeUsers,
        requestId,
        statusCode,
        true,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeUsersGetManyFailAction(err.message, requestId));
  }
}

export function* nodeUsersSagas(): Generator<ForkEffect, void, void> {
  yield takeLatest(
    NodeUsersActionTypes.NODE_USERS__GET_ONE__REQUEST,
    nodeUsersGetOneSaga,
  );
  yield takeLatest(
    NodeUsersActionTypes.NODE_USERS__GET_MANY__REQUEST,
    nodeUsersGetManySaga,
  );
}
