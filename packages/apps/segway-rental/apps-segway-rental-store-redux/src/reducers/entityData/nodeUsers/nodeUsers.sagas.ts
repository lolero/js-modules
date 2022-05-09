import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  fork,
  take,
  select,
  TakeEffect,
  SelectEffect,
  AllEffect,
  all,
} from 'redux-saga/effects';
import { createNodeReservationsDeleteManyRequestAction } from '../nodeReservations/nodeReservations.actionsCreators';
import { selectNodeUsersData } from './nodeUsers.selectors';
import { selectStateAuthMetadata } from '../../appState/stateAuth/stateAuth.selectors';
import { StateAuthReducer } from '../../appState/stateAuth/stateAuth.types';
import { NodeUsersReducer } from './nodeUsers.types';
import {
  NodeUsersActionTypes,
  NodeUsersDeleteOneRequestAction,
  NodeUsersGetOneRequestAction,
  NodeUsersUpdateOneRoleRequestAction,
} from './nodeUsers.actionsTypes';
import {
  createNodeUsersDeleteOneFailAction,
  createNodeUsersDeleteOneSuccessAction,
  createNodeUsersGetManySuccessAction,
  createNodeUsersGetOneFailAction,
  createNodeUsersGetOneSuccessAction,
  createNodeUsersUpdateOneRoleFailAction,
  createNodeUsersUpdateOneRoleSuccessAction,
} from './nodeUsers.actionsCreators';
import {
  NodeUsersDeleteOneServiceResponse,
  NodeUsersGetManyServiceResponse,
  NodeUsersGetOneServiceResponse,
  NodeUsersUpdateOneRoleServiceResponse,
} from './nodeUsers.servicesTypes';
import {
  nodeUsersDeleteOneService,
  nodeUsersGetManyService,
  nodeUsersGetOneService,
  nodeUsersUpdateOneRoleService,
} from './nodeUsers.services';
import { normalizeNodeUsersRawArray } from './nodeUsers.normalizer';
import { StateAuthActionTypes } from '../../appState/stateAuth/stateAuth.actionsTypes';

export function* nodeUsersGetManySaga(): Generator<
  TakeEffect | SelectEffect | CallEffect | PutEffect,
  void,
  NodeUsersGetManyServiceResponse | NodeUsersReducer['data']
> {
  while (true) {
    yield take([
      StateAuthActionTypes.STATE_AUTH_LOGIN_SUCCESS,
      StateAuthActionTypes.STATE_AUTH_LOGOUT_SUCCESS,
    ]);

    const { authUser } = (yield select(
      selectStateAuthMetadata,
    )) as StateAuthReducer['metadata'];

    if (authUser) {
      const { data: nodeUsersRawArray } = (yield call(
        nodeUsersGetManyService,
      )) as NodeUsersGetManyServiceResponse;

      const normalizedNodeUsers = normalizeNodeUsersRawArray(nodeUsersRawArray);

      yield put(createNodeUsersGetManySuccessAction(normalizedNodeUsers, true));
    } else {
      yield put(createNodeUsersGetManySuccessAction({}, true));
    }
  }
}

export function* nodeUsersGetOneSaga({
  requestMetadata,
  requestId,
}: NodeUsersGetOneRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeUsersGetOneServiceResponse | NodeUsersReducer['data']
> {
  try {
    const { entityPk: nodeUserPk } = requestMetadata;

    const { data: nodeUserRaw, status } = (yield call(
      nodeUsersGetOneService,
      nodeUserPk,
    )) as NodeUsersGetOneServiceResponse;

    const normalizedNodeUsers = normalizeNodeUsersRawArray([nodeUserRaw]);

    yield put(
      createNodeUsersGetOneSuccessAction(
        normalizedNodeUsers,
        requestId,
        status,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeUsersGetOneFailAction(err.message, requestId));
  }
}

export function* nodeUsersUpdateOneRoleSaga({
  requestMetadata,
  requestId,
}: NodeUsersUpdateOneRoleRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeUsersUpdateOneRoleServiceResponse | NodeUsersReducer['data']
> {
  try {
    const { nodeUserPk, role } = requestMetadata;

    const { data: nodeUserRaw, status } = (yield call(
      nodeUsersUpdateOneRoleService,
      nodeUserPk,
      role,
    )) as NodeUsersUpdateOneRoleServiceResponse;

    const normalizedNodeUsers = normalizeNodeUsersRawArray([nodeUserRaw]);

    yield put(
      createNodeUsersUpdateOneRoleSuccessAction(
        normalizedNodeUsers,
        requestId,
        status,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeUsersUpdateOneRoleFailAction(err.message, requestId));
  }
}

export function* nodeUsersDeleteOneSaga({
  requestMetadata,
  requestId,
}: NodeUsersDeleteOneRequestAction): Generator<
  SelectEffect | CallEffect | AllEffect<PutEffect> | PutEffect,
  void,
  NodeUsersReducer['data'] | NodeUsersDeleteOneServiceResponse
> {
  try {
    const { entityPk: nodeUserPk } = requestMetadata;

    const nodeUsers = (yield select(
      selectNodeUsersData,
    )) as NodeUsersReducer['data'];
    const nodeUser = nodeUsers[nodeUserPk];

    const { status } = (yield call(
      nodeUsersDeleteOneService,
      nodeUserPk,
    )) as NodeUsersDeleteOneServiceResponse;

    yield all([
      put(
        createNodeUsersDeleteOneSuccessAction([nodeUserPk], requestId, status),
      ),
      put(
        createNodeReservationsDeleteManyRequestAction(
          nodeUser.__edges__.reservations,
        ),
      ),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeUsersDeleteOneFailAction(err.message, requestId));
  }
}

export function* nodeUsersSagas(): Generator<ForkEffect, void, void> {
  yield fork(nodeUsersGetManySaga);
  yield takeEvery(
    NodeUsersActionTypes.NODE_USERS_GET_ONE__REQUEST,
    nodeUsersGetOneSaga,
  );
  yield takeEvery(
    NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__REQUEST,
    nodeUsersUpdateOneRoleSaga,
  );
  yield takeEvery(
    NodeUsersActionTypes.NODE_USERS_DELETE_ONE__REQUEST,
    nodeUsersDeleteOneSaga,
  );
}
