import { ReduxStore } from '@js-modules/apps-dapp-common-store-redux';
import React from 'react';
import { Provider } from 'react-redux';
import { DappThemeProvider } from './DappThemeProvider';

type MainReduxProviderProps = {
  reduxStore: ReduxStore;
};

export const DappReduxProvider: React.FC<MainReduxProviderProps> = ({
  reduxStore,
}) => {
  return (
    <Provider store={reduxStore}>
      <DappThemeProvider />
    </Provider>
  );
};
