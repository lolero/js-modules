import { ReduxStore } from '@js-modules/apps-vending-machine-common-store-redux';
import React from 'react';
import { Provider } from 'react-redux';
import { VendingMachineThemeProvider } from './VendingMachineThemeProvider';

type MainReduxProviderProps = {
  reduxStore: ReduxStore;
};

export const VendingMachineReduxProvider: React.FC<MainReduxProviderProps> = ({
  reduxStore,
}) => {
  return (
    <Provider store={reduxStore}>
      <VendingMachineThemeProvider />
    </Provider>
  );
};
