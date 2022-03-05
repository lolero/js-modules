import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import HomeWorkspace from './HomeWorkspace';

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
        <Route path="/*" element={<HomeWorkspace />} />
      </Routes>
    </Box>
  );
};

export default MainRoutesBox;