import React, { forwardRef, useContext } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import useNavDisplayMetadata from '../hooks/useNavDisplayMetadata';
import {
  WORKSPACE_PADDING_X_SPACING,
  WORKSPACE_TOOLBAR_PADDING_Y_SPACING,
} from '../constants/navConstants';

type Props = {
  children: BoxProps['children'];
};

const WorkspaceToolbarBox = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    const theme = useTheme();

    const { navBarHeight, workspaceMarginLeft } = useContext(WorkspaceContext);

    const { isMobile, isNavDrawerHidden } = useNavDisplayMetadata();

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'background.default',
            py: theme.spacing(WORKSPACE_TOOLBAR_PADDING_Y_SPACING),
            px:
              isMobile || isNavDrawerHidden
                ? theme.spacing(1)
                : theme.spacing(WORKSPACE_PADDING_X_SPACING),
            ml: workspaceMarginLeft,
            mt: `${navBarHeight}px`,
          }}
          ref={ref}
        >
          {children}
        </Box>
        <Divider sx={{ mt: '-1px' }} />
      </>
    );
  },
);

export default WorkspaceToolbarBox;
