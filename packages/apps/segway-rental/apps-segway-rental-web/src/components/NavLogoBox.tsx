import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import NavLogoShortIcon from './NavLogoShort';
import { Modules } from '../types/navTypes';

const NavLogoBox: React.FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box component={Link} to={`/${Modules.Portfolio}`}>
      <NavLogoShortIcon
        sx={{
          width: theme.spacing(6.5),
          height: '100%',
        }}
      />
    </Box>
  );
};

export default NavLogoBox;
