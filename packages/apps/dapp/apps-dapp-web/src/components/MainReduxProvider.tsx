import { ReduxStore } from '@js-modules/apps-dapp-store-redux';
import React from 'react';
import { Provider } from 'react-redux';
import { MainThemeProvider } from './MainThemeProvider';

type MainReduxProviderProps = {
  reduxStore: ReduxStore;
};

export const MainReduxProvider: React.FC<MainReduxProviderProps> = ({
  reduxStore,
}) => {
  return (
    <Provider store={reduxStore}>
      <MainThemeProvider />
    </Provider>
  );
};
