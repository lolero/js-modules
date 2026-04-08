import { faEthereum } from '@fortawesome/free-brands-svg-icons/faEthereum';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type React from 'react';
import { MuiFaIcon } from '@js-modules/web-react-utils';

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
