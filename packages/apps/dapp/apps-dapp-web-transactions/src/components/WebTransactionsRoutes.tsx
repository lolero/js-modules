import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  WebModules,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataDapp } from '@js-modules/apps-dapp-web-components';
import { WebTransactionsWorkspaceBox } from './WebTransactionsWorkspaceBox';

export const WebTransactionsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebTransactionsWorkspaceBox />} />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={
              routesMetadataDapp[WebModules.portfolio].subRoutes![
                WebSubModulesPortfolio.transactions
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
