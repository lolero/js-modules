import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  dappRoutesMetadata,
  Modules,
  SubModulesAnalytics,
} from '@js-modules/apps-dapp-common-constants';
import { WebAnalyticsWorkspaceBox } from './WebAnalyticsWorkspaceBox';
import { WebAnalyticsTokensRoutes } from './WebAnalyticsTokensRoutes';

export const WebAnalyticsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebAnalyticsWorkspaceBox />} />
      <Route
        path={`${SubModulesAnalytics.tokens}/*`}
        element={<WebAnalyticsTokensRoutes />}
      />
      <Route
        path={`${SubModulesAnalytics.history}/*`}
        element={<WebAnalyticsTokensRoutes />}
      />
      <Route
        path={`${SubModulesAnalytics.insights}/*`}
        element={<WebAnalyticsTokensRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate replace to={dappRoutesMetadata[Modules.analytics].path} />
        }
      />
    </Routes>
  );
};
