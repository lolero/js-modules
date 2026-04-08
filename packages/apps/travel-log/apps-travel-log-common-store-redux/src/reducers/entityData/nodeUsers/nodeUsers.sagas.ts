import type { SagaGenerator } from 'typed-redux-saga';
import { all, call, put, takeLatest } from 'typed-redux-saga';
import {
  createNodeUsersGetManyFailAction,
  createNodeUsersGetManySuccessAction,
  createNodeUsersGetOneFailAction,
  createNodeUsersGetOneSuccessAction,
} from './nodeUsers.actions.creators';
import type {
  NodeUsersGetManyRequestAction,
  NodeUsersGetOneRequestAction,
} from './nodeUsers.actions.types';
import { NodeUsersActionTypes } from './nodeUsers.actions.types';
import { normalizeUsersPublicDtoArray } from './nodeUsers.normalizer';
import {
  nodeUsersGetManyService,
  nodeUsersGetOneService,
} from './nodeUsers.services';

export function* nodeUsersGetOneSaga({
  requestMetadata,
  requestId,
}: NodeUsersGetOneRequestAction): SagaGenerator<void> {
  const { uniqueKeyValue, uniqueKeyName } = requestMetadata;

  try {
    const { data: usersPublicDto, status: statusCode } = yield* call(
      nodeUsersGetOneService,
      uniqueKeyValue,
      uniqueKeyName,
    );

    const normalizedNodeUsers = yield* call(normalizeUsersPublicDtoArray, [
      usersPublicDto,
    ]);

    yield* put(
      createNodeUsersGetOneSuccessAction(
        normalizedNodeUsers,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeUsersGetOneFailAction(message, requestId));
  }
}

export function* nodeUsersGetManySaga({
  requestId,
}: NodeUsersGetManyRequestAction): SagaGenerator<void> {
  try {
    const { data: usersPublicDtoArray, status: statusCode } = yield* call(
      nodeUsersGetManyService,
    );

    const normalizedNodeUsers = yield* call(
      normalizeUsersPublicDtoArray,
      usersPublicDtoArray,
    );

    yield* put(
      createNodeUsersGetManySuccessAction(
        normalizedNodeUsers,
        requestId,
        statusCode,
        true,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeUsersGetManyFailAction(message, requestId));
  }
}

export function* nodeUsersSagas(): SagaGenerator<void> {
  yield* all([
    takeLatest(
      NodeUsersActionTypes.NODE_USERS__GET_ONE__REQUEST,
      nodeUsersGetOneSaga,
    ),
    takeLatest(
      NodeUsersActionTypes.NODE_USERS__GET_MANY__REQUEST,
      nodeUsersGetManySaga,
    ),
  ]);
}
