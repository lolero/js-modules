import Box from '@mui/material/Box';
import type React from 'react';
import { useStateAuthReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';

export const FeedsWorkspaceContentBox: React.FC = () => {
  const { tokens } = useStateAuthReducerMetadata();
  return (
    <Box>
      <Box>FeedsWorkspaceContentBox</Box>
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
