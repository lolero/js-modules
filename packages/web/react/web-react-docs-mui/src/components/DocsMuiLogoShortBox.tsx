import Box from '@mui/material/Box';
import type React from 'react';
import { MuiIconMui } from '@js-modules/web-react-icons-mui';

export const DocsMuiLogoShortBox: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        height: '40px',
        pl: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <MuiIconMui fontSize="large" />
    </Box>
  );
};
