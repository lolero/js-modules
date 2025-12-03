import React from 'react';
import {
  getStoreRedux,
  TravelLogReduxProvider,
} from '@js-modules/apps-travel-log-common-react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TravelLogPaperProvider } from './TravelLogPaperProvider';

function initApp(): React.FC {
  const reduxStore = getStoreRedux();

  const App: React.FC = () => (
    <SafeAreaProvider>
      <TravelLogReduxProvider reduxStore={reduxStore}>
        <TravelLogPaperProvider />
      </TravelLogReduxProvider>
    </SafeAreaProvider>
  );

  return App;
}

export const TravelLogNative = initApp();
