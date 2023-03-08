import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { appStateSagas } from './appState/appState.sagas';
import { entityDataSagas } from './entityData/entityData.sagas';

export function* sagas(): Generator<AllEffect<ForkEffect>, void, void> {
  yield all([...appStateSagas, ...entityDataSagas]);
}
