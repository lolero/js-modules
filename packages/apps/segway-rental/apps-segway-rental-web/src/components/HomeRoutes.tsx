import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WorkspaceBox } from '@js-modules/web-react-nav';
import { Modules } from '../types/segwayRentalWebTypes';

const HomeRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WorkspaceBox topToolbar={} workspaceToolbar={} workspaceContent={} />
        }
      />
      <Route path="/*" element={<Navigate to={`/${Modules.home}`} replace />} />
    </Routes>
  );
};

export default HomeRoutes;
