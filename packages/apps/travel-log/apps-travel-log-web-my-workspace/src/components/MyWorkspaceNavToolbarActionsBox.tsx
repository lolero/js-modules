import React from 'react';
import Box from '@mui/material/Box';
import { MyWorkspaceNotificationsMenu } from './MyWorkspaceNotificationsMenu';
import { MyWorkspaceAccountMenu } from './MyWorkspaceAccountMenu';

export const MyWorkspaceNavToolbarActionsBox: React.FC = () => {
  return (
    <Box>
      <MyWorkspaceNotificationsMenu />
      <MyWorkspaceAccountMenu />
    </Box>
  );
};
