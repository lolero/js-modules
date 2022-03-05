import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';

const MainLogoBox: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        textDecoration: 'none',
        color: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      component={Link}
      to="/"
    >
      <Icon
        sx={{
          mr: '.2em',
        }}
        className="fab fa-ethereum"
      />
      <Typography variant="h4" color="inherit">
        dApp
      </Typography>
    </Box>
  );
};

export const MainLogoBoxRaw = MainLogoBox;
export const MainLogoBoxMemo = React.memo(MainLogoBoxRaw);
export default MainLogoBoxMemo;
