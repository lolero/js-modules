import type React from 'react';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import { NavContextProvider } from '@js-modules/web-react-mui-workspace';
import { DappBrowserRouter } from './DappBrowserRouter';

export function DappNavContextProvider(): React.ReactNode {
  return (
    <NavContextProvider
      nonAuthenticatedRedirectPath="/"
      routesMetadatas={[routesMetadataPrivate]}
    >
      <DappBrowserRouter />
    </NavContextProvider>
  );
}
