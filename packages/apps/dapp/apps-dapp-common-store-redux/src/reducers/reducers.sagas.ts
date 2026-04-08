import type { SagaGenerator } from 'typed-redux-saga';
import { all } from 'typed-redux-saga';
import { appStateSagas } from './appState/appState.sagas';
import { entityDataSagas } from './entityData/entityData.sagas';

export function* sagas(): SagaGenerator<void> {
  yield* all([...appStateSagas, ...entityDataSagas]);
}
