import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  modulePaths,
  SubModulesAnalytics,
} from '@js-modules/apps-dapp-common-constants';
import { WebAnalyticsTokensWorkspaceBox } from './WebAnalyticsTokensWorkspaceBox';

export const WebAnalyticsTokensRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebAnalyticsTokensWorkspaceBox />} />
      <Route
        path="*"
        element={
          <Navigate replace to={modulePaths[SubModulesAnalytics.tokens]} />
        }
      />
    </Routes>
  );
};
