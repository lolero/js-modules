import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  AUTH_URI_TRAVEL_LOG,
  WebModulesPrivate,
  modulesPrivateRoutesMetadata,
  WebModulesPublic,
  modulesPublicRoutesMetadata,
} from '@js-modules/apps-travel-log-common-constants';
import { MyFeedsRoutes } from '@js-modules/apps-travel-log-web-my-feeds';
import {
  HomeWorkspaceBox,
  PurposeWorkspaceBox,
} from '@js-modules/apps-travel-log-web-site';
import {
  useStateAuthInitializeKeycloak,
  useStateSettingsGetProfile,
  useStateSettingsSignout,
} from '@js-modules/apps-travel-log-common-store-redux';
import { KeycloakConfig } from 'keycloak-js';
import { SettingsRoutes } from '@js-modules/apps-travel-log-web-settings';

const keycloakConfig: KeycloakConfig = {
  url: AUTH_URI_TRAVEL_LOG,
  realm: 'travel-log',
  clientId: 'client-web',
};

export const TravelLogRoutes: React.FunctionComponent = () => {
  const { callback: stateSettingsGetProfileCallback } =
    useStateSettingsGetProfile();

  const { callback: stateSettingsSignoutCallback } = useStateSettingsSignout();

  const {
    reducerMetadata: { isKeycloakReady, isAuthenticated },
    callback: stateAuthInitializeKeycloakCallback,
  } = useStateAuthInitializeKeycloak(
    keycloakConfig,
    stateSettingsGetProfileCallback,
    stateSettingsSignoutCallback,
  );

  useEffect(() => {
    stateAuthInitializeKeycloakCallback();
  }, [stateAuthInitializeKeycloakCallback]);

  if (!isKeycloakReady) {
    // TODO: create loading workspace with skeletons instead of this ugly
    //  circular loader
    return <CircularProgress />;
  }

  const rootPath = !isAuthenticated
    ? modulesPublicRoutesMetadata[WebModulesPublic.home].path
    : modulesPrivateRoutesMetadata[WebModulesPrivate.myFeeds].path;

  return (
    <Routes>
      <Route path={`${WebModulesPublic.home}`} element={<HomeWorkspaceBox />} />
      <Route
        path={`${WebModulesPublic.purpose}`}
        element={<PurposeWorkspaceBox />}
      />
      <Route
        path={`${WebModulesPrivate.myFeeds}/*`}
        element={<MyFeedsRoutes />}
      />
      <Route
        path={`${WebModulesPrivate.myBoards}/*`}
        element={<MyFeedsRoutes />}
      />
      <Route
        path={`${WebModulesPrivate.myLog}/*`}
        element={<MyFeedsRoutes />}
      />
      <Route
        path={`${WebModulesPrivate.myNetwork}/*`}
        element={<MyFeedsRoutes />}
      />
      <Route
        path={`${WebModulesPrivate.settings}/*`}
        element={<SettingsRoutes />}
      />
      <Route path="*" element={<Navigate replace to={rootPath} />} />
    </Routes>
  );
};
