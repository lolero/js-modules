import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import upperFirst from 'lodash/upperFirst';
import lowerCase from 'lodash/lowerCase';

export type TravelLogNavToolbarProps = {
  title: string;
  navActions: React.ReactNode;
};

export const TravelLogNavToolbar: React.FC<TravelLogNavToolbarProps> = ({
  title,
  navActions,
}) => {
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
          {upperFirst(lowerCase(title))}
        </Typography>
      </Box>
      <Box>{navActions}</Box>
    </Toolbar>
  );
};
