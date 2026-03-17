import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
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
              routesMetadataPrivate[WebModulesPrivate.portfolio].subRoutes![
                WebSubModulesPortfolio.tokens
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
