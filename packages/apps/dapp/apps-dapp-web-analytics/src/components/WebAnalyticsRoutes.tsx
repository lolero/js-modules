import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModules,
  WebSubModulesAnalytics,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataDapp } from '@js-modules/apps-dapp-web-components';
import { WebAnalyticsWorkspaceBox } from './WebAnalyticsWorkspaceBox';
import { WebAnalyticsTokensRoutes } from './WebAnalyticsTokensRoutes';

export const WebAnalyticsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebAnalyticsWorkspaceBox />} />
      <Route
        path={`${WebSubModulesAnalytics.tokens}/*`}
        element={<WebAnalyticsTokensRoutes />}
      />
      <Route
        path={`${WebSubModulesAnalytics.history}/*`}
        element={<WebAnalyticsTokensRoutes />}
      />
      <Route
        path={`${WebSubModulesAnalytics.insights}/*`}
        element={<WebAnalyticsTokensRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataDapp[WebModules.analytics].path}
          />
        }
      />
    </Routes>
  );
};
