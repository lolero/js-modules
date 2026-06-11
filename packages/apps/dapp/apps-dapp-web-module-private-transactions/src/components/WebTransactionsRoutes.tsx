import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import { WebTransactionsWorkspace } from './WebTransactionsWorkspace';

export const WebTransactionsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebTransactionsWorkspace />} />
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
