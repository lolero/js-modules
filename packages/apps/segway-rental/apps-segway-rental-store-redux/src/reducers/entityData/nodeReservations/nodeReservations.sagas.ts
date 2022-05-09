import { Task } from 'redux-saga';
import {
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  take,
  TakeEffect,
  fork,
  cancel,
  CancelEffect,
  SelectEffect,
  select,
  AllEffect,
  all,
  CallEffect,
  call,
} from 'redux-saga/effects';
import { doc, setDoc, getFirestore, writeBatch } from 'firebase/firestore';
import { NodeSegwaysReducer } from '../nodeSegways/nodeSegways.types';
import { NodeUsersReducer } from '../nodeUsers/nodeUsers.types';
import { selectStateAuthMetadata } from '../../appState/stateAuth/stateAuth.selectors';
import { destructNodeReservationPk } from './nodeReservations.pkUtils';
import {
  NodeReservationsActionTypes,
  NodeReservationsCreateOneRequestAction,
  NodeReservationsDeleteManyRequestAction,
  NodeReservationsUpdateOneWholeRequestAction,
} from './nodeReservations.actionsTypes';
import { StateAuthActionTypes } from '../../appState/stateAuth/stateAuth.actionsTypes';
import {
  createNodeReservationsCreateOneFailAction,
  createNodeReservationsCreateOneSuccessAction,
  createNodeReservationsDeleteManyFailAction,
  createNodeReservationsDeleteManySuccessAction,
  createNodeReservationsGetManySuccessAction,
  createNodeReservationsUpdateOneWholeFailAction,
  createNodeReservationsUpdateOneWholeSuccessAction,
} from './nodeReservations.actionsCreators';
import {
  getReservations,
  getUpdatedNodeSegwaysWithoutReservations,
  getUpdatedNodeUsersWithoutReservations,
} from './nodeReservations.sagasUtils';
import { StateAuthReducer } from '../../appState/stateAuth/stateAuth.types';
import { denormalizeNodeReservations } from './nodeReservations.normalizer';
import { createNodeSegwaysGetManySuccessAction } from '../nodeSegways/nodeSegways.actionsCreators';
import { createNodeUsersGetManySuccessAction } from '../nodeUsers/nodeUsers.actionsCreators';
import { NodeSegwaysActionTypes } from '../nodeSegways/nodeSegways.actionsTypes';

export function* nodeReservationsGetManySaga(): Generator<
  TakeEffect | SelectEffect | ForkEffect | CancelEffect | PutEffect,
  void,
  StateAuthReducer['metadata'] | Task
> {
  while (true) {
    yield take([
      StateAuthActionTypes.STATE_AUTH_LOGIN_SUCCESS,
      StateAuthActionTypes.STATE_AUTH_LOGOUT_SUCCESS,
    ]);

    const { authUser } = (yield select(
      selectStateAuthMetadata,
    )) as StateAuthReducer['metadata'];

    let getReservationsTask: Task | null = null;
    if (authUser) {
      yield take(NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__SUCCESS);
      getReservationsTask = (yield fork(getReservations)) as Task;
    } else {
      if (getReservationsTask) {
        yield cancel(getReservationsTask);
        getReservationsTask = null;
      }
      yield put(createNodeReservationsGetManySuccessAction({}, true));
    }
  }
}

export function* nodeReservationsCreateOneSaga({
  requestMetadata,
  requestId,
}: NodeReservationsCreateOneRequestAction): Generator<
  Promise<void> | PutEffect,
  void,
  void
> {
  try {
    const { entity: nodeReservation } = requestMetadata;

    const denormalizedNodeReservation = denormalizeNodeReservations({
      pk: nodeReservation,
    })[0];

    const db = getFirestore();
    yield setDoc(
      doc(db, 'reservations', nodeReservation.id),
      denormalizedNodeReservation,
    );

    yield put(createNodeReservationsCreateOneSuccessAction(requestId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeReservationsCreateOneFailAction(err.message, requestId),
    );
  }
}

export function* nodeReservationsUpdateOneWholeSaga({
  requestMetadata,
  requestId,
}: NodeReservationsUpdateOneWholeRequestAction): Generator<
  Promise<void> | PutEffect,
  void,
  void
> {
  try {
    const { entityPk: nodeReservationPk, entity: nodeReservation } =
      requestMetadata;

    const denormalizedNodeReservation = denormalizeNodeReservations({
      pk: nodeReservation,
    })[0];

    const nodeReservationId =
      destructNodeReservationPk(nodeReservationPk).fields.id;

    const db = getFirestore();
    yield setDoc(
      doc(db, 'reservations', nodeReservationId),
      denormalizedNodeReservation,
    );

    yield put(createNodeReservationsUpdateOneWholeSuccessAction(requestId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeReservationsUpdateOneWholeFailAction(err.message, requestId),
    );
  }
}

export function* nodeReservationsDeleteManySaga({
  requestMetadata,
  requestId,
}: NodeReservationsDeleteManyRequestAction): Generator<
  CallEffect | Promise<void> | AllEffect<PutEffect> | PutEffect,
  void,
  NodeSegwaysReducer['data'] | NodeUsersReducer['data']
> {
  try {
    const { entityPks: nodeReservationPks } = requestMetadata;

    const updatedNodeSegways = (yield call(
      getUpdatedNodeSegwaysWithoutReservations,
      nodeReservationPks,
    )) as NodeSegwaysReducer['data'];

    const updatedNodeUsers = (yield call(
      getUpdatedNodeUsersWithoutReservations,
      nodeReservationPks,
    )) as NodeUsersReducer['data'];

    const db = getFirestore();
    const batch = writeBatch(db);

    nodeReservationPks.forEach((nodeReservationPk) => {
      batch.delete(
        doc(
          db,
          'reservations',
          destructNodeReservationPk(nodeReservationPk).fields.id,
        ),
      );
    });

    yield batch.commit();

    yield all([
      put(
        createNodeReservationsDeleteManySuccessAction(
          nodeReservationPks,
          requestId,
          200,
        ),
      ),
      put(createNodeSegwaysGetManySuccessAction(updatedNodeSegways, false)),
      put(createNodeUsersGetManySuccessAction(updatedNodeUsers, false)),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeReservationsDeleteManyFailAction(err.message, requestId),
    );
  }
}

export function* nodeReservationsSagas(): Generator<ForkEffect, void, void> {
  yield fork(nodeReservationsGetManySaga);
  yield takeEvery(
    NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__REQUEST,
    nodeReservationsCreateOneSaga,
  );
  yield takeEvery(
    NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__REQUEST,
    nodeReservationsUpdateOneWholeSaga,
  );
  yield takeEvery(
    NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__REQUEST,
    nodeReservationsDeleteManySaga,
  );
}
