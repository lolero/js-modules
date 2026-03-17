import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
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
              routesMetadataPrivate[WebModulesPrivate.portfolio].subRoutes![
                WebSubModulesPortfolio.transactions
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
