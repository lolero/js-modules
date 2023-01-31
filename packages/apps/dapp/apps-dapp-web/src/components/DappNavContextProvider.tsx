import React from 'react';
import { NavContextProvider } from '@js-modules/web-react-nav';
import { DappBrowserRouter } from './DappBrowserRouter';

export const DappNavContextProvider: React.FC = () => {
  return (
    <NavContextProvider nonAuthenticatedRedirectPath="/">
      <DappBrowserRouter />
    </NavContextProvider>
  );
};
