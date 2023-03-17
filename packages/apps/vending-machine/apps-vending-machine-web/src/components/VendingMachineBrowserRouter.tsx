import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { VendingMachineRoutes } from './VendingMachineRoutes';

export const VendingMachineBrowserRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <VendingMachineRoutes />
    </BrowserRouter>
  );
};
