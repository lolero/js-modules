import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Tab, tabClasses, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Modules } from '../types/dappWebTypes';

const tabSx = {
  color: 'background.default',
  fontSize: '1em',
  [`&.${tabClasses.selected}`]: {
    color: 'background.default',
    '& span': {
      borderBottomStyle: 'solid',
      borderBottomWidth: '5px',
      borderBottomColor: 'background.default',
    },
  },
} as const;

const MainNavMenu: React.FunctionComponent = () => {
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
        <Tab sx={tabSx} value="/" label="Home" component={Link} to="/" />
        <Tab
          sx={tabSx}
          value={`/${Modules.tokens}`}
          label="Tokens"
          component={Link}
          to={`/${Modules.tokens}`}
        />
      </Tabs>
    </Toolbar>
  );
};

export const MainNavMenuRaw = MainNavMenu;
export const MainNavMenuMemo = React.memo(MainNavMenuRaw);
export default MainNavMenuMemo;
