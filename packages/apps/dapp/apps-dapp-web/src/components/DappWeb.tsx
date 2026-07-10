import type React from 'react';
import { createReduxStore } from '@js-modules/apps-dapp-common-store-redux';
import { ReduxProvider } from '@js-modules/common-react-utils';
import { DappThemeProvider } from './DappThemeProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  function App(): React.ReactNode {
    return (
      <ReduxProvider reduxStore={reduxStore}>
        <DappThemeProvider />
      </ReduxProvider>
    );
  }

  return App;
}

export const DappWeb = initApp();
