import React from 'react';
import { ReduxProvider } from '@js-modules/common-react-utils';
import { createReduxStore } from '@js-modules/apps-travel-log-common-store-redux';
import { TravelLogThemeProvider } from './TravelLogThemeProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  const App: React.FC = () => (
    <ReduxProvider reduxStore={reduxStore}>
      <TravelLogThemeProvider />
    </ReduxProvider>
  );

  return App;
}

export const TravelLogWeb = initApp();
