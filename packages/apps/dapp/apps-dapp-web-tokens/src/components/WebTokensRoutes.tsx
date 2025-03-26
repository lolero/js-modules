import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  WebModules,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataDapp } from '@js-modules/apps-dapp-web-components';
import { WebTokensWorkspaceBox } from './WebTokensWorkspaceBox';

export const WebTokensRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebTokensWorkspaceBox />} />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={
              routesMetadataDapp[WebModules.portfolio].subRoutes![
                WebSubModulesPortfolio.tokens
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
