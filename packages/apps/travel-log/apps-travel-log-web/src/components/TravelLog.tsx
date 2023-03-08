import React from 'react';
import { createReduxStore } from '@js-modules/apps-travel-log-common-store-redux';
import { TravelLogReduxProvider } from './TravelLogReduxProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  const App: React.FC = () => (
    <TravelLogReduxProvider reduxStore={reduxStore} />
  );

  return App;
}

export const TravelLog = initApp();
