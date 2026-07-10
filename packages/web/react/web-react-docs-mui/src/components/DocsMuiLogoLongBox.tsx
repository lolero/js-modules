import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type React from 'react';
import { MuiIconMui } from '@js-modules/web-react-icons-mui';

export function DocsMuiLogoLongBox(): React.ReactNode {
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
      <Typography
        sx={{
          ml: 1,
        }}
      >
        MUI Theme
      </Typography>
    </Box>
  );
}
