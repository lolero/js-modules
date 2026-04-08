import type React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createReduxStore } from '@js-modules/apps-travel-log-common-store-redux';
import { ReduxProvider } from '@js-modules/common-react-utils';
import { TravelLogPaperProvider } from './TravelLogPaperProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  const App: React.FC = () => (
    <SafeAreaProvider>
      <ReduxProvider reduxStore={reduxStore}>
        <TravelLogPaperProvider />
      </ReduxProvider>
    </SafeAreaProvider>
  );

  return App;
}

export const TravelLogNative = initApp();
