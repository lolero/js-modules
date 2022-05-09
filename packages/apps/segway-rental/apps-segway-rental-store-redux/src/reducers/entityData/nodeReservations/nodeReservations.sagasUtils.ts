import {
  all,
  AllEffect,
  call,
  CallEffect,
  cancelled,
  CancelledEffect,
  ChannelTakeEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
} from 'redux-saga/effects';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { eventChannel, EventChannel } from 'redux-saga';
import { difference, intersection, isEmpty, without } from 'lodash';
import { getDaysArrayInTimestampRange } from '@js-modules/apps-segway-rental-utils';
import { selectNodeReservationsData } from './nodeReservations.selectors';
import { selectNodeUsersData } from '../nodeUsers/nodeUsers.selectors';
import { selectNodeSegwaysData } from '../nodeSegways/nodeSegways.selectors';
import {
  NodeReservationRaw,
  NodeReservationsReducer,
} from './nodeReservations.types';
import { normalizeNodeReservationsRawArray } from './nodeReservations.normalizer';
import { createNodeReservationsGetManySuccessAction } from './nodeReservations.actionsCreators';
import {
  NodeSegway,
  NodeSegwaysReducer,
} from '../nodeSegways/nodeSegways.types';
import { NodeUser, NodeUsersReducer } from '../nodeUsers/nodeUsers.types';
import { createNodeSegwaysGetManySuccessAction } from '../nodeSegways/nodeSegways.actionsCreators';
import { createNodeUsersGetManySuccessAction } from '../nodeUsers/nodeUsers.actionsCreators';

function createReservationsChannel(): EventChannel<NodeReservationRaw[]> {
  const db = getFirestore();

  const q = query(collection(db, 'reservations'));

  const reservationsChannel = eventChannel(
    (emit: (input: NodeReservationRaw[]) => void) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const nodeReservationsRawArray = snapshot.docs.map(
          (documentData) => documentData.data() as NodeReservationRaw,
        );
        emit(nodeReservationsRawArray);
      });
      return unsubscribe;
    },
  );

  return reservationsChannel;
}

function* getUpdatedNodeSegwaysWithNewReservations(
  nodeReservationsRawArray: NodeReservationRaw[],
): Generator<
  SelectEffect,
  NodeSegwaysReducer['data'],
  NodeSegwaysReducer['data']
> {
  const nodeSegways = (yield select(
    selectNodeSegwaysData,
  )) as NodeSegwaysReducer['data'];

  const updatedNodeSegways: NodeSegwaysReducer['data'] = {};

  nodeReservationsRawArray.forEach((nodeReservationRaw) => {
    const nodeReservationPk = nodeReservationRaw.id;

    const nodeSegwayPk = nodeReservationRaw.segwayId;
    const nodeSegway =
      updatedNodeSegways[nodeSegwayPk] || nodeSegways[nodeSegwayPk];

    if (!nodeSegway) {
      return;
    }

    const reservationDateArray = getDaysArrayInTimestampRange(
      nodeReservationRaw.fromTimestamp,
      nodeReservationRaw.toTimestamp,
    );

    const missingDates = difference(
      reservationDateArray,
      nodeSegway.reservedDays,
    );

    if (
      isEmpty(missingDates) &&
      nodeSegway.__edges__.reservations.includes(nodeReservationPk)
    ) {
      return;
    }

    const updatedNodeSegway: NodeSegway = { ...nodeSegway };

    if (!isEmpty(missingDates)) {
      const reservedDays = [...nodeSegway.reservedDays, ...missingDates].sort();
      updatedNodeSegway.reservedDays = reservedDays;
    }

    if (!nodeSegway.__edges__.reservations.includes(nodeReservationPk)) {
      const reservations = [
        ...(updatedNodeSegway.__edges__.reservations || []),
        nodeReservationPk,
      ];

      updatedNodeSegway.__edges__.reservations = reservations;
    }

    updatedNodeSegways[nodeSegwayPk] = updatedNodeSegway;
  });

  return updatedNodeSegways;
}

function* getUpdatedNodeUsersWithNewReservations(
  nodeReservationsRawArray: NodeReservationRaw[],
): Generator<SelectEffect, NodeUsersReducer['data'], NodeUsersReducer['data']> {
  const nodeUsers = (yield select(
    selectNodeUsersData,
  )) as NodeUsersReducer['data'];

  const updatedNodeUsers: NodeUsersReducer['data'] = {};

  nodeReservationsRawArray.forEach((nodeReservationRaw) => {
    const nodeReservationPk = nodeReservationRaw.id;

    const nodeUserPk = nodeReservationRaw.userId;
    const nodeUser = updatedNodeUsers[nodeUserPk] || nodeUsers[nodeUserPk];

    if (
      !nodeUser ||
      nodeUser.__edges__.reservations.includes(nodeReservationPk)
    ) {
      return;
    }

    const reservations = [
      ...(nodeUser.__edges__.reservations || []),
      nodeReservationRaw.id,
    ];

    const updatedNodeUser: NodeUser = {
      ...nodeUser,
      __edges__: {
        ...nodeUser.__edges__,
        reservations,
      },
    };

    updatedNodeUsers[nodeUserPk] = updatedNodeUser;
  });

  return updatedNodeUsers;
}

export function* getReservations(): Generator<
  | CancelledEffect
  | ChannelTakeEffect<NodeReservationRaw[]>
  | CallEffect
  | AllEffect<PutEffect>,
  void,
  NodeReservationRaw[] | NodeSegwaysReducer['data'] | NodeUsersReducer['data']
> {
  const reservationsChannel = createReservationsChannel();

  while (true) {
    if (yield cancelled()) {
      reservationsChannel.close();
    }

    const nodeReservationsRawArray = (yield take(
      reservationsChannel,
    )) as NodeReservationRaw[];

    const normalizedNodeReservations = normalizeNodeReservationsRawArray(
      nodeReservationsRawArray,
    );

    const updatedNodeSegways = (yield call(
      getUpdatedNodeSegwaysWithNewReservations,
      nodeReservationsRawArray,
    )) as NodeSegwaysReducer['data'];

    const updatedNodeUsers = (yield call(
      getUpdatedNodeUsersWithNewReservations,
      nodeReservationsRawArray,
    )) as NodeUsersReducer['data'];

    yield all([
      put(
        createNodeReservationsGetManySuccessAction(
          normalizedNodeReservations,
          false,
        ),
      ),
      put(createNodeSegwaysGetManySuccessAction(updatedNodeSegways, false)),
      put(createNodeUsersGetManySuccessAction(updatedNodeUsers, false)),
    ]);
  }
}

export function* getUpdatedNodeSegwaysWithoutReservations(
  nodeReservationsPks: string[],
): Generator<
  SelectEffect,
  NodeSegwaysReducer['data'],
  NodeReservationsReducer['data'] | NodeSegwaysReducer['data']
> {
  const nodeReservations = (yield select(
    selectNodeReservationsData,
  )) as NodeReservationsReducer['data'];

  const nodeSegways = (yield select(
    selectNodeSegwaysData,
  )) as NodeSegwaysReducer['data'];

  const updatedNodeSegways: NodeSegwaysReducer['data'] = {};

  nodeReservationsPks.forEach((nodeReservationPk) => {
    const nodeReservation = nodeReservations[nodeReservationPk];

    const nodeSegwayPk = nodeReservation.__edges__.segway[0];
    const nodeSegway =
      updatedNodeSegways[nodeSegwayPk] || nodeSegways[nodeSegwayPk];

    if (!nodeSegway) {
      return;
    }

    const reservationDateArray = getDaysArrayInTimestampRange(
      nodeReservation.fromTimestamp,
      nodeReservation.toTimestamp,
    );

    const datesToDelete = intersection(
      nodeSegway.reservedDays,
      reservationDateArray,
    );

    if (
      isEmpty(datesToDelete) &&
      !nodeSegway.__edges__.reservations.includes(nodeReservationPk)
    ) {
      return;
    }

    const updatedNodeSegway: NodeSegway = { ...nodeSegway };

    if (!isEmpty(datesToDelete)) {
      const reservedDays = without(nodeSegway.reservedDays, ...datesToDelete);
      updatedNodeSegway.reservedDays = reservedDays;
    }

    if (nodeSegway.__edges__.reservations.includes(nodeReservationPk)) {
      const reservations = without(
        updatedNodeSegway.__edges__.reservations,
        nodeReservationPk,
      );

      updatedNodeSegway.__edges__.reservations = reservations;
    }

    updatedNodeSegways[nodeSegwayPk] = updatedNodeSegway;
  });

  return updatedNodeSegways;
}

export function* getUpdatedNodeUsersWithoutReservations(
  nodeReservationsPks: string[],
): Generator<
  SelectEffect,
  NodeUsersReducer['data'],
  NodeReservationsReducer['data'] | NodeUsersReducer['data']
> {
  const nodeReservations = (yield select(
    selectNodeReservationsData,
  )) as NodeReservationsReducer['data'];

  const nodeUsers = (yield select(
    selectNodeUsersData,
  )) as NodeUsersReducer['data'];

  const updatedNodeUsers: NodeUsersReducer['data'] = {};

  nodeReservationsPks.forEach((nodeReservationPk) => {
    const nodeReservation = nodeReservations[nodeReservationPk];

    const nodeUserPk = nodeReservation.__edges__.user[0];
    const nodeUser = updatedNodeUsers[nodeUserPk] || nodeUsers[nodeUserPk];

    if (
      !nodeUser ||
      !nodeUser.__edges__.reservations.includes(nodeReservationPk)
    ) {
      return;
    }

    const updatedNodeUser: NodeUser = {
      ...nodeUser,
      __edges__: {
        ...nodeUser.__edges__,
        reservations: without(
          nodeUser.__edges__.reservations,
          nodeReservationPk,
        ),
      },
    };

    updatedNodeUsers[nodeUserPk] = updatedNodeUser;
  });

  return updatedNodeUsers;
}
