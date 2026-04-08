import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';
import type React from 'react';

export type TravelLogNavToolbarProps = {
  icon?: React.ReactNode;
  title: string;
  navActions: React.ReactNode;
};

export const TravelLogNavToolbar: React.FC<TravelLogNavToolbarProps> = ({
  icon,
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
        {icon ?? null}
        <Typography
          sx={{
            fontWeight: 'bold',
            ml: 1,
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
