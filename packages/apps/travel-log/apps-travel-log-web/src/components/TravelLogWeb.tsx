import type React from 'react';
import { createReduxStore } from '@js-modules/apps-travel-log-common-store-redux';
import { ReduxProvider } from '@js-modules/common-react-utils';
import { TravelLogThemeProvider } from './TravelLogThemeProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  function App(): React.ReactNode {
    return (
      <ReduxProvider reduxStore={reduxStore}>
        <TravelLogThemeProvider />
      </ReduxProvider>
    );
  }

  return App;
}

export const TravelLogWeb = initApp();
