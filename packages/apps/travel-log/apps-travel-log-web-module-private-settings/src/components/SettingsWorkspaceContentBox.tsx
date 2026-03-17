import React from 'react';
import Box from '@mui/material/Box';
import { useStateAuthReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';

export const SettingsWorkspaceContentBox: React.FC = () => {
  const { tokens } = useStateAuthReducerMetadata();
  return (
    <Box>
      <Box>SettingsWorkspaceContentBox</Box>
      <Box
        sx={{
          width: '400px',
          overflow: 'auto',
          whiteSpace: 'wrap',
          overflowWrap: 'break-word',
        }}
      >
        Access token: {tokens?.access.token}
      </Box>
    </Box>
  );
};
