import React from 'react';
import { MuiFaIcon } from '@js-modules/web-react-components';
import Box from '@mui/material/Box';
import { faStore } from '@fortawesome/free-solid-svg-icons/faStore';

export const VendingMachineLogoShortBox: React.FunctionComponent = () => {
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
    </Box>
  );
};
