import type React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DocsMuiRoutes } from './DocsMuiRoutes';

export function DocsMuiBrowserRouter(): React.ReactNode {
  return (
    <BrowserRouter>
      <DocsMuiRoutes />
    </BrowserRouter>
  );
}
