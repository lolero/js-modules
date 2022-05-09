import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Tab, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  UserRoles,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import { Modules } from '../types/segwayRentalWebTypes';

const tabSx = {
  color: 'background.default',
  fontSize: '1em',
  '&.Mui-selected': {
    color: 'background.default',
    '& span': {
      borderBottomStyle: 'solid',
      borderBottomWidth: '5px',
      borderBottomColor: 'background.default',
    },
  },
} as const;

const MainNavMenu: React.FunctionComponent = () => {
  const { authUser, authUserRole } = useStateAuthReducerMetadata();

  const { pathname } = useLocation();

  return (
    <Toolbar
      sx={{
        color: 'background.default',
      }}
      variant="dense"
    >
      <Tabs
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'end',
        }}
        value={pathname}
      >
        <Tab
          sx={tabSx}
          value={`/${Modules.home}`}
          label="Home"
          component={Link}
          to={`/${Modules.home}`}
        />
        <Tab
          sx={tabSx}
          value={`/${Modules.locations}`}
          label="Locations"
          component={Link}
          to={`/${Modules.locations}`}
        />
        {authUser && (
          <Tab
            sx={tabSx}
            value={`/${Modules.segways}`}
            label="Segways"
            component={Link}
            to={`/${Modules.segways}`}
          />
        )}
        {authUser && authUserRole === UserRoles.admin && (
          <Tab
            sx={tabSx}
            value={`/${Modules.users}`}
            label="Users"
            component={Link}
            to={`/${Modules.users}`}
          />
        )}
        {authUser && (
          <Tab
            sx={tabSx}
            value={`/${Modules.reservations}`}
            label="Reservations"
            component={Link}
            to={`/${Modules.reservations}`}
          />
        )}
      </Tabs>
    </Toolbar>
  );
};

export const MainNavMenuRaw = MainNavMenu;
export const MainNavMenuMemo = React.memo(MainNavMenuRaw);
export default MainNavMenuMemo;
