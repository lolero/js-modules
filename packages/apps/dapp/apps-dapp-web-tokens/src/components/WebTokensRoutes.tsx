import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  modulePaths,
  SubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { WebTokensWorkspaceBox } from './WebTokensWorkspaceBox';

export const WebTokensRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebTokensWorkspaceBox />} />
      <Route
        path="*"
        element={
          <Navigate replace to={modulePaths[SubModulesPortfolio.tokens]} />
        }
      />
    </Routes>
  );
};
