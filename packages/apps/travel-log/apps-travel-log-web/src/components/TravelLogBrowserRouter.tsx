import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TravelLogRoutes } from './TravelLogRoutes';

export const TravelLogBrowserRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <TravelLogRoutes />
    </BrowserRouter>
  );
};
