import type React from 'react';
import {
  routesMetadataPrivate,
  routesMetadataPublic,
} from '@js-modules/apps-travel-log-common-react';
import { NavContextProvider } from '@js-modules/web-react-mui-workspace';
import { TravelLogBrowserRouter } from './TravelLogBrowserRouter';

export const TravelLogNavContextProvider: React.FC = () => {
  return (
    <NavContextProvider
      nonAuthenticatedRedirectPath="/"
      routesMetadatas={[routesMetadataPublic, routesMetadataPrivate]}
    >
      <TravelLogBrowserRouter />
    </NavContextProvider>
  );
};
