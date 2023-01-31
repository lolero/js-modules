import React from 'react';
import { faEthereum } from '@fortawesome/free-brands-svg-icons/faEthereum';
import { MuiFaIcon } from '@js-modules/web-react-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const DappLogoLongBox: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        height: '40px',
        pl: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <MuiFaIcon icon={faEthereum} fontSize="large" />
      <Typography
        sx={{
          ml: 1,
        }}
      >
        Long Logo
      </Typography>
    </Box>
  );
};
