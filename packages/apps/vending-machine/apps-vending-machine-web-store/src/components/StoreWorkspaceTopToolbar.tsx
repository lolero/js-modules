import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import {
  useStateMainDeposit,
  useStateMainReset,
} from '@js-modules/apps-vending-machine-common-store-redux';

export const StoreWorkspaceTopToolbar: React.FC = () => {
  const { request: depositRequest, callback: depositCallback } =
    useStateMainDeposit();
  const { request: resetRequest, callback: resetCallback } =
    useStateMainReset();

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {depositRequest?.isPending && 'Processing deposit...'}
        {resetRequest?.isPending && 'Processing reset...'}
      </Box>
      <Typography>Deposit</Typography>
      <Fab color="success" size="small" onClick={() => depositCallback(5)}>
        $5
      </Fab>
      <Fab color="success" size="small" onClick={() => depositCallback(10)}>
        $10
      </Fab>
      <Fab color="success" size="small" onClick={() => depositCallback(20)}>
        $20
      </Fab>
      <Fab color="success" size="small" onClick={() => depositCallback(50)}>
        $50
      </Fab>
      <Fab color="success" size="small" onClick={() => depositCallback(100)}>
        $100
      </Fab>
      <Button variant="outlined" color="error" onClick={resetCallback}>
        Reset
      </Button>
    </Box>
  );
};
