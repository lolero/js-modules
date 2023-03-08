import { ReduxStore } from '@js-modules/apps-dapp-common-stores-redux';
import React from 'react';
import { Provider } from 'react-redux';
import { TravelLogThemeProvider } from './TravelLogThemeProvider';

type MainReduxProviderProps = {
  reduxStore: ReduxStore;
};

export const TravelLogReduxProvider: React.FC<MainReduxProviderProps> = ({
  reduxStore,
}) => {
  return (
    <Provider store={reduxStore}>
      <TravelLogThemeProvider />
    </Provider>
  );
};
