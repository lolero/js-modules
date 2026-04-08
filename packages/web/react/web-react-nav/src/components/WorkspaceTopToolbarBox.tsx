import Box from '@mui/material/Box';
import type React from 'react';
import { forwardRef, useContext } from 'react';
import { NavContext } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

export const CSS_CLASSNAME__WORKSPACE_TOP_TOOLBAR_BOX =
  'workspace-top-toolbar-box';

type WorkspaceTopToolbarBoxProps = {
  children: React.ReactNode;
};

export const WorkspaceTopToolbarBox = forwardRef<
  HTMLDivElement,
  WorkspaceTopToolbarBoxProps
>(function WorkspaceTopToolbarBox({ children }, ref) {
  const { workspaceTopToolbarPaddingYSpacing, workspacePaddingXSpacing } =
    useContext(NavContext);

  const { navTopToolbarHeight, workspaceMarginLeft, workspaceMarginRight } =
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
        mt: `${navTopToolbarHeight}px`,
        ml: workspaceMarginLeft,
        mr: workspaceMarginRight,
      })}
      ref={ref}
      className={CSS_CLASSNAME__WORKSPACE_TOP_TOOLBAR_BOX}
    >
      {children}
    </Box>
  );
});
