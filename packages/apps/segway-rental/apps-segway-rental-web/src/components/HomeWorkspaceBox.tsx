import React from 'react';
import Box from '@mui/material/Box';
import { useStateAuthReducerMetadata } from '@js-modules/apps-segway-rental-store-redux';
import Typography from '@mui/material/Typography';

const HomeWorkspaceBox: React.FunctionComponent = () => {
  const { authUser } = useStateAuthReducerMetadata();

  return (
    <Box>
      {authUser && (
        <Typography variant="h3">Hello {authUser?.displayName}!</Typography>
      )}
      here goes the home page
    </Box>
  );
};

export const HomeWorkspaceBoxRaw = HomeWorkspaceBox;
export const HomeWorkspaceBoxMemo = React.memo(HomeWorkspaceBoxRaw);
export default HomeWorkspaceBoxMemo;
