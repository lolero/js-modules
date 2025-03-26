import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModules,
  WebSubModulesAnalytics,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataDapp } from '@js-modules/apps-dapp-web-components';
import { WebAnalyticsTokensWorkspaceBox } from './WebAnalyticsTokensWorkspaceBox';

export const WebAnalyticsTokensRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebAnalyticsTokensWorkspaceBox />} />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={
              routesMetadataDapp[WebModules.analytics].subRoutes![
                WebSubModulesAnalytics.tokens
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
