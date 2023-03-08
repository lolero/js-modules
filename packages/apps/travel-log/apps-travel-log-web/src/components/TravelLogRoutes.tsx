import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Modules } from '@js-modules/apps-travel-log-common-constants';
import { WebHomeRoutes } from './WebHomeRoutes';

export const TravelLogRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path={`${Modules.home}/*`} element={<WebHomeRoutes />} />
      <Route path="*" element={<Navigate replace to={`/${Modules.home}`} />} />
    </Routes>
  );
};
