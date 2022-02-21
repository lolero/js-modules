import { applyMiddleware, createStore, CombinedState, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

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
  const reduxStore = createStore(
    reducers,
    composeWithDevTools({
      trace: true,
      traceLimit: 25,
    })(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(sagas);
  return reduxStore;
}
