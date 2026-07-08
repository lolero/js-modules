import type React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WebRouterProvider } from '@js-modules/web-react-router/react-router';
import { DocsMuiRoutes } from './DocsMuiRoutes';

export function DocsMuiBrowserRouter(): React.ReactNode {
  return (
    <BrowserRouter>
      <WebRouterProvider>
        <DocsMuiRoutes />
      </WebRouterProvider>
    </BrowserRouter>
  );
}
