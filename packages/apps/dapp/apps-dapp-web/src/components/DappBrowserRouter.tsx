import type React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WebRouterProvider } from '@js-modules/web-react-router/react-router';
import { DappRoutes } from './DappRoutes';

export function DappBrowserRouter(): React.ReactNode {
  return (
    <BrowserRouter>
      <WebRouterProvider>
        <DappRoutes />
      </WebRouterProvider>
    </BrowserRouter>
  );
}
