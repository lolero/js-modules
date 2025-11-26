import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import { MyFeedsRoutes } from '@js-modules/apps-travel-log-web-my-feeds';
import {
  HomeWorkspaceBox,
  PurposeWorkspaceBox,
} from '@js-modules/apps-travel-log-web-site';
import { SettingsRoutes } from '@js-modules/apps-travel-log-web-settings';
import { MyLogRoutes } from '@js-modules/apps-travel-log-web-my-log';
import { useInitializeKeycloak } from '@js-modules/apps-travel-log-common-react';

export const TravelLogRoutes: React.FunctionComponent = () => {
  const { isKeycloakReady, rootPath } = useInitializeKeycloak();

  if (!isKeycloakReady) {
    // TODO: create loading workspace with skeletons instead of this ugly
    //  circular loader
    return <CircularProgress />;
  }

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
      <Route path={`${WebModulesPrivate.myLog}/*`} element={<MyLogRoutes />} />
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
