import {
  put,
  PutEffect,
  cancelled,
  CancelledEffect,
  take,
  ChannelTakeEffect,
} from 'redux-saga/effects';
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { eventChannel, EventChannel } from 'redux-saga';
import { NodeSegwayRaw } from './nodeSegways.types';
import { normalizeNodeSegwaysRawArray } from './nodeSegways.normalizer';
import { createNodeSegwaysGetManySuccessAction } from './nodeSegways.actionsCreators';

function createSegwaysChannel(): EventChannel<NodeSegwayRaw[]> {
  const db = getFirestore();

  const q = query(collection(db, 'segways'));

  const segwaysChannel = eventChannel(
    (emit: (input: NodeSegwayRaw[]) => void) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const nodeSegwaysRawArray = snapshot.docs.map(
          (documentData) => documentData.data() as NodeSegwayRaw,
        );
        emit(nodeSegwaysRawArray);
      });
      return unsubscribe;
    },
  );

  return segwaysChannel;
}

export function* getSegways(): Generator<
  CancelledEffect | ChannelTakeEffect<NodeSegwayRaw[]> | PutEffect,
  void,
  NodeSegwayRaw[]
> {
  const segwaysChannel = createSegwaysChannel();

  while (true) {
    if (yield cancelled()) {
      segwaysChannel.close();
    }

    const nodeSegwaysRawArray = (yield take(segwaysChannel)) as NodeSegwayRaw[];
    const normalizedNodeSegways =
      normalizeNodeSegwaysRawArray(nodeSegwaysRawArray);

    yield put(
      createNodeSegwaysGetManySuccessAction(normalizedNodeSegways, false),
    );
  }
}
