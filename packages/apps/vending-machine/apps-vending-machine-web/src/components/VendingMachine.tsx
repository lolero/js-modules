import React from 'react';
import { createReduxStore } from '@js-modules/apps-vending-machine-common-store-redux';
import { VendingMachineReduxProvider } from './VendingMachineReduxProvider';

function initApp(): React.FC {
  const reduxStore = createReduxStore();

  const App: React.FC = () => (
    <VendingMachineReduxProvider reduxStore={reduxStore} />
  );

  return App;
}

export const VendingMachine = initApp();
