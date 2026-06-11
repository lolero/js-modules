import CircularProgress from '@mui/material/CircularProgress';
import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import { useInitializeKeycloak } from '@js-modules/apps-travel-log-common-react';
import { ClientType } from '@js-modules/apps-travel-log-common-store-redux';
import { FeedsRoutes } from '@js-modules/apps-travel-log-web-module-private-feeds';
import { LogRoutes } from '@js-modules/apps-travel-log-web-module-private-log';
import { SettingsRoutes } from '@js-modules/apps-travel-log-web-module-private-settings';
import {
  HomeWorkspace,
  PublicWorkspaceLayout,
  PurposeWorkspace,
} from '@js-modules/apps-travel-log-web-module-public-site';
import { PrivateWorkspaceLayout } from '@js-modules/apps-travel-log-web-workspace-private';

export const TravelLogRoutes: React.FunctionComponent = () => {
  const { isKeycloakReady, rootPath } = useInitializeKeycloak(ClientType.web);

  if (!isKeycloakReady) {
    // TODO: create loading workspace with skeletons instead of this ugly
    //  circular loader
    return <CircularProgress />;
  }

  return (
    <Routes>
      <Route element={<PublicWorkspaceLayout />}>
        <Route path={`${WebModulesPublic.home}`} element={<HomeWorkspace />} />
        <Route
          path={`${WebModulesPublic.purpose}`}
          element={<PurposeWorkspace />}
        />
      </Route>
      <Route element={<PrivateWorkspaceLayout />}>
        <Route
          path={`${WebModulesPrivate.feeds}/*`}
          element={<FeedsRoutes />}
        />
        <Route
          path={`${WebModulesPrivate.boards}/*`}
          element={<FeedsRoutes />}
        />
        <Route path={`${WebModulesPrivate.log}/*`} element={<LogRoutes />} />
        <Route
          path={`${WebModulesPrivate.network}/*`}
          element={<FeedsRoutes />}
        />
        <Route
          path={`${WebModulesPrivate.settings}/*`}
          element={<SettingsRoutes />}
        />
      </Route>
      <Route path="*" element={<Navigate replace to={rootPath} />} />
    </Routes>
  );
};
