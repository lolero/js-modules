import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import type React from 'react';
import {
  WorkspaceSlotBox,
  WorkspaceSlotName,
} from '@js-modules/web-react-mui-workspace';

export type TravelLogNavToolbarProps = {
  navActions: React.ReactNode;
};

export const TravelLogNavToolbar: React.FC<TravelLogNavToolbarProps> = ({
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
      <WorkspaceSlotBox
        name={WorkspaceSlotName.title}
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          minWidth: 0,
        }}
      />
      <Box>{navActions}</Box>
    </Toolbar>
  );
};
