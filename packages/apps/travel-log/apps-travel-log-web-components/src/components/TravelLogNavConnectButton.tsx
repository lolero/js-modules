import React from 'react';
import Button from '@mui/material/Button';
import noop from 'lodash/noop';

export const TravelLogNavConnectButton: React.FC = () => {
  return (
    <Button variant="contained" onClick={noop}>
      Connect wallet
    </Button>
  );
};
