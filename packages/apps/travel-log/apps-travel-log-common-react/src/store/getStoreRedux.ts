import {
  createReduxStore,
  ReduxStore,
} from '@js-modules/apps-travel-log-common-store-redux';

export function getStoreRedux(): ReduxStore {
  const reduxStore = createReduxStore();
  return reduxStore;
}
