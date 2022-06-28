import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './MainRoutes';

export const MainBrowserRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
};
