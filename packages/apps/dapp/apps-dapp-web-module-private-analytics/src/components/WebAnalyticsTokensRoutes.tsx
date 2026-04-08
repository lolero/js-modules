import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesAnalytics,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
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
              routesMetadataPrivate[WebModulesPrivate.analytics].subRoutes![
                WebSubModulesAnalytics.tokens
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
