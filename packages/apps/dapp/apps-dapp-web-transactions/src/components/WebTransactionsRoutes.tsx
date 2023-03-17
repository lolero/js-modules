import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  dappRoutesMetadata,
  Modules,
  SubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
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
              dappRoutesMetadata[Modules.portfolio].subRoutes![
                SubModulesPortfolio.transactions
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
