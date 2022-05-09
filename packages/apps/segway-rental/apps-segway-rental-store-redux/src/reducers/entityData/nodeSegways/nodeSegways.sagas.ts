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
} from 'redux-saga/effects';
import { doc, setDoc, deleteDoc, getFirestore } from 'firebase/firestore';
import { createNodeReservationsDeleteManyRequestAction } from '../nodeReservations/nodeReservations.actionsCreators';
import { selectNodeSegwaysData } from './nodeSegways.selectors';
import { selectStateAuthMetadata } from '../../appState/stateAuth/stateAuth.selectors';
import { destructNodeSegwayPk } from './nodeSegways.pkUtils';
import {
  NodeSegwaysActionTypes,
  NodeSegwaysCreateOneRequestAction,
  NodeSegwaysDeleteOneRequestAction,
  NodeSegwaysUpdateOneWholeRequestAction,
} from './nodeSegways.actionsTypes';
import { StateAuthActionTypes } from '../../appState/stateAuth/stateAuth.actionsTypes';
import {
  createNodeSegwaysCreateOneFailAction,
  createNodeSegwaysCreateOneSuccessAction,
  createNodeSegwaysDeleteOneFailAction,
  createNodeSegwaysDeleteOneSuccessAction,
  createNodeSegwaysGetManySuccessAction,
  createNodeSegwaysUpdateOnePartialFailAction,
  createNodeSegwaysUpdateOnePartialSuccessAction,
} from './nodeSegways.actionsCreators';
import { getSegways } from './nodeSegways.sagasUtils';
import { StateAuthReducer } from '../../appState/stateAuth/stateAuth.types';
import { denormalizeNodeSegways } from './nodeSegways.normalizer';
import { NodeUsersActionTypes } from '../nodeUsers/nodeUsers.actionsTypes';
import { NodeSegwaysReducer } from './nodeSegways.types';

export function* nodeSegwaysGetManySaga(): Generator<
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

    let getSegwaysTask: Task | null = null;
    if (authUser) {
      yield take(NodeUsersActionTypes.NODE_USERS_GET_MANY__SUCCESS);
      getSegwaysTask = (yield fork(getSegways)) as Task;
    } else {
      if (getSegwaysTask) {
        yield cancel(getSegwaysTask);
        getSegwaysTask = null;
      }
      yield put(createNodeSegwaysGetManySuccessAction({}, true));
    }
  }
}

export function* nodeSegwaysCreateOneSaga({
  requestMetadata,
  requestId,
}: NodeSegwaysCreateOneRequestAction): Generator<
  Promise<void> | PutEffect,
  void,
  void
> {
  try {
    const { entity: nodeSegway } = requestMetadata;

    const denormalizedNodeSegway = denormalizeNodeSegways({
      pk: nodeSegway,
    })[0];

    const db = getFirestore();
    yield setDoc(doc(db, 'segways', nodeSegway.id), denormalizedNodeSegway);

    yield put(createNodeSegwaysCreateOneSuccessAction(requestId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeSegwaysCreateOneFailAction(err.message, requestId));
  }
}

export function* nodeSegwaysUpdateOneWholeSaga({
  requestMetadata,
  requestId,
}: NodeSegwaysUpdateOneWholeRequestAction): Generator<
  Promise<void> | PutEffect,
  void,
  void
> {
  try {
    const { entityPk: nodeSegwayPk, entity: nodeSegway } = requestMetadata;

    const denormalizedNodeSegway = denormalizeNodeSegways({
      pk: nodeSegway,
    })[0];

    const nodeSegwayId = destructNodeSegwayPk(nodeSegwayPk).fields.id;

    const db = getFirestore();
    yield setDoc(doc(db, 'segways', nodeSegwayId), denormalizedNodeSegway);

    yield put(createNodeSegwaysUpdateOnePartialSuccessAction(requestId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeSegwaysUpdateOnePartialFailAction(err.message, requestId),
    );
  }
}

export function* nodeSegwaysDeleteOneSaga({
  requestMetadata,
  requestId,
}: NodeSegwaysDeleteOneRequestAction): Generator<
  SelectEffect | Promise<void> | AllEffect<PutEffect> | PutEffect,
  void,
  NodeSegwaysReducer['data']
> {
  try {
    const { entityPk: nodeSegwayPk } = requestMetadata;

    const nodeSegways = (yield select(
      selectNodeSegwaysData,
    )) as NodeSegwaysReducer['data'];
    const nodeSegway = nodeSegways[nodeSegwayPk];

    const db = getFirestore();
    yield deleteDoc(
      doc(db, 'segways', destructNodeSegwayPk(nodeSegwayPk).fields.id),
    );

    yield all([
      put(
        createNodeSegwaysDeleteOneSuccessAction([nodeSegwayPk], requestId, 200),
      ),
      put(
        createNodeReservationsDeleteManyRequestAction(
          nodeSegway.__edges__.reservations,
        ),
      ),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeSegwaysDeleteOneFailAction(err.message, requestId));
  }
}

export function* nodeSegwaysSagas(): Generator<ForkEffect, void, void> {
  yield fork(nodeSegwaysGetManySaga);
  yield takeEvery(
    NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__REQUEST,
    nodeSegwaysCreateOneSaga,
  );
  yield takeEvery(
    NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__REQUEST,
    nodeSegwaysUpdateOneWholeSaga,
  );
  yield takeEvery(
    NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__REQUEST,
    nodeSegwaysDeleteOneSaga,
  );
}
