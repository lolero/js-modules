import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  AUTH_BASE_URI,
  MyModules,
  myModulesRoutesMetadata,
  PublicModules,
  publicModulesRoutesMetadata,
} from '@js-modules/apps-travel-log-common-constants';
import { MyFeedsRoutes } from '@js-modules/apps-travel-log-web-my-feeds';
import {
  HomeWorkspaceBox,
  PurposeWorkspaceBox,
} from '@js-modules/apps-travel-log-web-site';
import { useStateAuthInitializeKeycloak } from '@js-modules/apps-travel-log-common-store-redux';
import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: AUTH_BASE_URI,
  realm: 'travel-log',
  clientId: 'client-web',
};

export const TravelLogRoutes: React.FunctionComponent = () => {
  const {
    reducerMetadata: { isKeycloakReady, isAuthenticated },
  } = useStateAuthInitializeKeycloak(keycloakConfig);

  if (!isKeycloakReady) {
    // TODO: create loading workspace with skeletons instead of this ugly
    //  circular loader
    return <CircularProgress />;
  }

  const rootPath = !isAuthenticated
    ? publicModulesRoutesMetadata[PublicModules.home].path
    : myModulesRoutesMetadata[MyModules.myFeeds].path;

  return (
    <Routes>
      <Route path={`${PublicModules.home}`} element={<HomeWorkspaceBox />} />
      <Route
        path={`${PublicModules.purpose}`}
        element={<PurposeWorkspaceBox />}
      />
      <Route path={`${MyModules.myFeeds}/*`} element={<MyFeedsRoutes />} />
      <Route path={`${MyModules.myBoards}/*`} element={<MyFeedsRoutes />} />
      <Route path={`${MyModules.myLog}/*`} element={<MyFeedsRoutes />} />
      <Route path={`${MyModules.myNetwork}/*`} element={<MyFeedsRoutes />} />
      <Route path="*" element={<Navigate replace to={rootPath} />} />
    </Routes>
  );
};
