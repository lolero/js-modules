import type React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WebRouterProvider } from '@js-modules/web-react-router/react-router';
import { TravelLogRoutes } from './TravelLogRoutes';

export function TravelLogBrowserRouter(): React.ReactNode {
  return (
    <BrowserRouter>
      <WebRouterProvider>
        <TravelLogRoutes />
      </WebRouterProvider>
    </BrowserRouter>
  );
}
