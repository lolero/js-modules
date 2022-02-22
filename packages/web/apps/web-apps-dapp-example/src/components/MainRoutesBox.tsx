import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Icon, Typography } from '@mui/material';
import { getIsBrowser } from '@js-modules/common-utils-general';

const appBoxSx = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
} as const;

const MainRoutesBox: React.FunctionComponent = () => {
  return (
    <Box sx={appBoxSx}>
      <Routes>
        <Route
          path="/test"
          element={
            <Box>
              <Icon className="fas fa-circle-notch fa-spin" color="inherit" />
              <Typography variant="h2">
                isBrowser: {`${getIsBrowser()}`}
              </Typography>
            </Box>
          }
        />
        <Route
          path="/*"
          element={
            <Box>
              <Typography variant="h2">
                isBrowser: {`${getIsBrowser()}`}
              </Typography>
            </Box>
          }
        />
      </Routes>
    </Box>
  );
};

export default MainRoutesBox;
