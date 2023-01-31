import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DappRoutes } from './DappRoutes';

export const DappBrowserRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <DappRoutes />
    </BrowserRouter>
  );
};
