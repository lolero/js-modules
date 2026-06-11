import type React from 'react';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import { NavContextProvider } from '@js-modules/web-react-nav';
import { DappBrowserRouter } from './DappBrowserRouter';

export const DappNavContextProvider: React.FC = () => {
  return (
    <NavContextProvider
      nonAuthenticatedRedirectPath="/"
      routesMetadatas={[routesMetadataPrivate]}
    >
      <DappBrowserRouter />
    </NavContextProvider>
  );
};
