import React from 'react';
import { createReduxStore } from '@js-modules/apps-dapp-common-stores-redux';
import { DappReduxProvider } from './DappReduxProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  const App: React.FC = () => <DappReduxProvider reduxStore={reduxStore} />;

  return App;
}

export const Dapp = initApp();
