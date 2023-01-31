import React from 'react';
import { MuiFaIcon } from '@js-modules/web-react-components';
import Box from '@mui/material/Box';
import { faEthereum } from '@fortawesome/free-brands-svg-icons/faEthereum';

export const DappLogoShortBox: React.FunctionComponent = () => {
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
    </Box>
  );
};
