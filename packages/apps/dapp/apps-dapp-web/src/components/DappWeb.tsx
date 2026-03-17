import React from 'react';
import { ReduxProvider } from '@js-modules/common-react-utils';
import { createReduxStore } from '@js-modules/apps-dapp-common-store-redux';
import { DappThemeProvider } from './DappThemeProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  const App: React.FC = () => (
    <ReduxProvider reduxStore={reduxStore}>
      <DappThemeProvider />
    </ReduxProvider>
  );

  return App;
}

export const DappWeb = initApp();
