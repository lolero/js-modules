import { faEthereum } from '@fortawesome/free-brands-svg-icons/faEthereum';
import Box from '@mui/material/Box';
import type React from 'react';
import { MuiFaIcon } from '@js-modules/web-react-mui';

export function DappLogoShortBox(): React.ReactNode {
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
}
