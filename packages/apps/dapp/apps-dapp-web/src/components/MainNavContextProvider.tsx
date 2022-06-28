import React from 'react';
import { NavContextProvider } from '@js-modules/web-react-nav';
import { MainBrowserRouter } from './MainBrowserRouter';

export const MainNavContextProvider: React.FC = () => {
  return (
    <NavContextProvider nonAuthenticatedRedirectPath="/">
      <MainBrowserRouter />
    </NavContextProvider>
  );
};
