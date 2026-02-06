import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { upperFirst } from 'lodash';
import { DappNavConnectButton } from './DappNavConnectButton';

export type DappNavToolbarProps = {
  title: string;
};

export const DappNavToolbar: React.FC<DappNavToolbarProps> = ({ title }) => {
  return (
    <Toolbar
      sx={{
        py: 1,
        px: '0px !important',
        flexGrow: 1,
      }}
      variant="dense"
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
          variant="h5"
        >
          {upperFirst(title)}
        </Typography>
      </Box>
      <DappNavConnectButton />
    </Toolbar>
  );
};
