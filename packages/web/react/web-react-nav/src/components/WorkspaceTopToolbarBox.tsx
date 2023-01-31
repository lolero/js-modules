import React, { forwardRef, useContext } from 'react';
import Box from '@mui/material/Box';
import { NavContext } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

type WorkspaceTopToolbarBoxProps = {
  children: React.ReactNode;
};

export const WorkspaceTopToolbarBox = forwardRef<
  HTMLDivElement,
  WorkspaceTopToolbarBoxProps
>(({ children }, ref) => {
  const { workspaceTopToolbarPaddingYSpacing, workspacePaddingXSpacing } =
    useContext(NavContext);

  const { navTopToolbarHeight, workspaceMarginLeft } =
    useContext(WorkspaceContext);

  const { isMobile, isNavLeftDrawerHidden } = useNavDisplayMetadata();

  return (
    <Box
      sx={(t) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'background.default',
        py: t.spacing(workspaceTopToolbarPaddingYSpacing),
        px:
          isMobile || isNavLeftDrawerHidden
            ? t.spacing(1)
            : t.spacing(workspacePaddingXSpacing),
        ml: workspaceMarginLeft,
        mt: `${navTopToolbarHeight}px`,
      })}
      ref={ref}
    >
      {children}
    </Box>
  );
});
