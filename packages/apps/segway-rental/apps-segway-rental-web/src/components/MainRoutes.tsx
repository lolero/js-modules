import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  UserRoles,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import { usePrevious } from '@js-modules/common-react-hooks';
import HomeWorkspace from './HomeWorkspace';
import { Modules } from '../types/segwayRentalWebTypes';
import SegwaysWorkspace from './SegwaysWorkspace';
import UsersWorkspace from './UsersWorkspace';
import ReservationsWorkspace from './ReservationsWorkspace';
import LocationsWorkspace from './LocationsWorkspace';

const appBoxSx = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
} as const;

const MainRoutes: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const { authUser, authUserRole } = useStateAuthReducerMetadata();
  const authUserPrevious = usePrevious(authUser);

  useEffect(() => {
    if (authUserPrevious && !authUser) {
      navigate(`/${Modules.home}`);
    }
  }, [authUser, authUserPrevious, navigate]);

  return (
    <Box sx={appBoxSx}>
      <Routes>
        <Route path={`/${Modules.home}`} element={<HomeWorkspace />} />
        <Route
          path={`/${Modules.locations}`}
          element={<LocationsWorkspace />}
        />
        {authUser && (
          <Route path={`/${Modules.segways}`} element={<SegwaysWorkspace />} />
        )}
        {authUser && authUserRole === UserRoles.admin && (
          <Route path={`/${Modules.users}`} element={<UsersWorkspace />} />
        )}
        {authUser && (
          <Route
            path={`/${Modules.reservations}`}
            element={<ReservationsWorkspace />}
          />
        )}
        <Route
          path="/*"
          element={
            <Navigate
              to={authUserRole ? `/${Modules.segways}` : `/${Modules.home}`}
              replace
            />
          }
        />
      </Routes>
    </Box>
  );
};

export default MainRoutes;
