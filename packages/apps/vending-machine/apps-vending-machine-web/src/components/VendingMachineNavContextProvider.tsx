import React from 'react';
import { NavContextProvider } from '@js-modules/web-react-nav';
import { VendingMachineBrowserRouter } from './VendingMachineBrowserRouter';

export const VendingMachineNavContextProvider: React.FC = () => {
  return (
    <NavContextProvider nonAuthenticatedRedirectPath="/">
      <VendingMachineBrowserRouter />
    </NavContextProvider>
  );
};
