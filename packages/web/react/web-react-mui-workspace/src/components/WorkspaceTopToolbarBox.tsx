import Box from '@mui/material/Box';
import type React from 'react';
import { useContext } from 'react';
import { NavContext } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { CSS_CLASSNAME__WORKSPACE_TOP_TOOLBAR_BOX } from '../styles/cssClassNames';

type WorkspaceTopToolbarBoxProps = {
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
};

/**
 * Sticky toolbar strip below the app bar, offset to clear the nav drawers.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying box element.
 * @param props.children - Toolbar content.
 * @returns The toolbar box element.
 */
export function WorkspaceTopToolbarBox({
  ref,
  children,
}: WorkspaceTopToolbarBoxProps): React.ReactNode {
  const { workspaceTopToolbarPaddingYSpacing, workspacePaddingXSpacing } =
    useContext(NavContext);

  const { navTopToolbarHeight, workspaceMarginLeft, workspaceMarginRight } =
    useContext(WorkspaceContext);

  const { isMobile, isNavLeftDrawerHidden } = useNavDisplayMetadata();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'background.default',
        py: workspaceTopToolbarPaddingYSpacing,
        px: isMobile || isNavLeftDrawerHidden ? 1 : workspacePaddingXSpacing,
        mt: `${navTopToolbarHeight}px`,
        ml: workspaceMarginLeft,
        mr: workspaceMarginRight,
      }}
      ref={ref}
      className={CSS_CLASSNAME__WORKSPACE_TOP_TOOLBAR_BOX}
    >
      {children}
    </Box>
  );
}
