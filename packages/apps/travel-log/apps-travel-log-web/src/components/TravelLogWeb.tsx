import React from 'react';
import {
  getStoreRedux,
  TravelLogReduxProvider,
} from '@js-modules/apps-travel-log-common-react';
import { TravelLogThemeProvider } from './TravelLogThemeProvider';

function initApp(): React.FC {
  const reduxStore = getStoreRedux();

  const App: React.FC = () => (
    <TravelLogReduxProvider reduxStore={reduxStore}>
      <TravelLogThemeProvider />
    </TravelLogReduxProvider>
  );

  return App;
}

export const TravelLogWeb = initApp();
