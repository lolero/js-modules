import React from 'react';
import { NavContextProvider } from '@js-modules/web-react-nav';
import { TravelLogBrowserRouter } from './TravelLogBrowserRouter';

export const TravelLogNavContextProvider: React.FC = () => {
  return (
    <NavContextProvider nonAuthenticatedRedirectPath="/">
      <TravelLogBrowserRouter />
    </NavContextProvider>
  );
};
