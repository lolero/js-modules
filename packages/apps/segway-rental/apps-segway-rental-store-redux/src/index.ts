import {
  applyMiddleware,
  // eslint-disable-next-line camelcase
  legacy_createStore,
  CombinedState,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { reducers } from './reducers/reducers.reducers';
import { sagas } from './reducers/reducers.sagas';

import { AppStateReducers } from './reducers/appState/appState.types';
import { EntityDataReducers } from './reducers/entityData/entityData.types';
import { ReducerHittingAction } from './reducers/reducers.types';

const sagaMiddleware = createSagaMiddleware();

export * from './reducers/reducers.exports';
export * from './reducers/reducers.initialState';
export * from './reducers/reducers.types';

export function createReduxStore(): Store<
  CombinedState<{
    appState: CombinedState<AppStateReducers>;
    entityData: CombinedState<EntityDataReducers>;
  }>,
  ReducerHittingAction
> {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAiOuMOVDxoDI8pbNAH9BFiTdmhtqrgHXw',
    authDomain: 'segway-rental.firebaseapp.com',
    projectId: 'segway-rental',
    storageBucket: 'segway-rental.appspot.com',
    messagingSenderId: '83147887768',
    appId: '1:83147887768:web:ed7eecd602cdf4fdb4aced',
    measurementId: 'G-G7FY1PS7B6',
  });
  getAnalytics(firebaseApp);

  const reduxStore = legacy_createStore(
    reducers,
    composeWithDevTools({
      trace: true,
      traceLimit: 25,
    })(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(sagas);
  return reduxStore;
}
