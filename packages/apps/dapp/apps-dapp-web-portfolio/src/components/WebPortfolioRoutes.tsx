import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModules,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { WebTokensRoutes } from '@js-modules/apps-dapp-web-tokens';
import { WebTransactionsRoutes } from '@js-modules/apps-dapp-web-transactions';
import { routesMetadataDapp } from '@js-modules/apps-dapp-web-components';
import { WebPortfolioWorkspaceBox } from './WebPortfolioWorkspaceBox';

export const WebPortfolioRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebPortfolioWorkspaceBox />} />
      <Route
        path={`${WebSubModulesPortfolio.tokens}/*`}
        element={<WebTokensRoutes />}
      />
      <Route
        path={`${WebSubModulesPortfolio.transactions}/*`}
        element={<WebTransactionsRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataDapp[WebModules.portfolio].path}
          />
        }
      />
    </Routes>
  );
};
