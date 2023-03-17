import React from 'react';
import { faStore } from '@fortawesome/free-solid-svg-icons/faStore';
import { MuiFaIcon } from '@js-modules/web-react-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const VendingMachineLogoLongBox: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        height: '40px',
        pl: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <MuiFaIcon icon={faStore} fontSize="large" />
      <Typography
        sx={{
          ml: 1,
        }}
      >
        Vending Machine
      </Typography>
    </Box>
  );
};
