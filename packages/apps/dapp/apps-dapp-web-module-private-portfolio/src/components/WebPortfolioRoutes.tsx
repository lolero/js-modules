import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import { WebTokensRoutes } from '@js-modules/apps-dapp-web-module-private-tokens';
import { WebTransactionsRoutes } from '@js-modules/apps-dapp-web-module-private-transactions';
import { WebPortfolioWorkspace } from './WebPortfolioWorkspace';

export const WebPortfolioRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebPortfolioWorkspace />} />
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
            to={routesMetadataPrivate[WebModulesPrivate.portfolio].path}
          />
        }
      />
    </Routes>
  );
};
