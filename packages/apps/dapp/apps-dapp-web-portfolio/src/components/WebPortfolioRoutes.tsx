import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  dappRoutesMetadata,
  Modules,
  SubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { WebTokensRoutes } from '@js-modules/apps-dapp-web-tokens';
import { WebTransactionsRoutes } from '@js-modules/apps-dapp-web-transactions';
import { WebPortfolioWorkspaceBox } from './WebPortfolioWorkspaceBox';

export const WebPortfolioRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebPortfolioWorkspaceBox />} />
      <Route
        path={`${SubModulesPortfolio.tokens}/*`}
        element={<WebTokensRoutes />}
      />
      <Route
        path={`${SubModulesPortfolio.transactions}/*`}
        element={<WebTransactionsRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate replace to={dappRoutesMetadata[Modules.portfolio].path} />
        }
      />
    </Routes>
  );
};
