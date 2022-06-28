import React from 'react';
import { createReduxStore } from '@js-modules/apps-dapp-store-redux';
import { MainReduxProvider } from './MainReduxProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  const App: React.FC = () => <MainReduxProvider reduxStore={reduxStore} />;

  return App;
}

export const MainApp = initApp();
