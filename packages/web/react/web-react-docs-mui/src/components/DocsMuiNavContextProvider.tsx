import type React from 'react';
import { NavContextProvider } from '@js-modules/web-react-nav';
import { routesMetadataMui } from '../routesMetadata/routesMetadata';
import { DocsMuiBrowserRouter } from './DocsMuiBrowserRouter';

export function DocsMuiNavContextProvider(): React.ReactNode {
  return (
    <NavContextProvider
      nonAuthenticatedRedirectPath="/"
      routesMetadatas={[routesMetadataMui]}
    >
      <DocsMuiBrowserRouter />
    </NavContextProvider>
  );
}
