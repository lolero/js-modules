import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesAnalytics,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import { WebAnalyticsTokensRoutes } from './WebAnalyticsTokensRoutes';
import { WebAnalyticsWorkspace } from './WebAnalyticsWorkspace';

export const WebAnalyticsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebAnalyticsWorkspace />} />
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
            to={routesMetadataPrivate[WebModulesPrivate.analytics].path}
          />
        }
      />
    </Routes>
  );
};
