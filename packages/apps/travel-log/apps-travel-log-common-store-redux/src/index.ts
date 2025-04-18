import {
  applyMiddleware,
  legacy_createStore as createStore,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { reducers } from './reducers/reducers.reducers';
import { sagas } from './reducers/reducers.sagas';

const sagaMiddleware = createSagaMiddleware();

export * from './reducers/reducers.exports';
export * from './reducers/reducers.initialState';
export * from './reducers/reducers.types';

export type ReduxStore = Store;

export function createReduxStore(): ReduxStore {
  const storeEnhancerReduxSaga = applyMiddleware(sagaMiddleware);
  const storeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  })(storeEnhancerReduxSaga) as Partial<{ appState: never; entityData: never }>;
  const reduxStore = createStore(reducers, storeEnhancers);
  sagaMiddleware.run(sagas);
  return reduxStore;
}
