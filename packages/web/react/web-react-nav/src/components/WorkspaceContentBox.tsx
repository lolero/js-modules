import React, { useCallback, useContext } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import {
  WorkspaceContext,
  ScrollDirection,
} from '../contexts/WorkspaceContext';
import { WORKSPACE_PADDING_X_SPACING } from '../constants/navConstants';
import { NavDrawerDisplayStatus, NavContext } from '../contexts/NavContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

export type WorkspaceContentBoxProps = {
  setWorkspaceScrollTop: (scrollTop: number) => void;
  setWorkspaceScrollDirection: (scrollDirection?: ScrollDirection) => void;
  contentSx?: BoxProps['sx'];
  children: BoxProps['children'];
};

export const WorkspaceContentBox: React.FunctionComponent<
  WorkspaceContentBoxProps
> = ({
  setWorkspaceScrollTop,
  setWorkspaceScrollDirection,
  contentSx,
  children,
}) => {
  const { navLeftDrawerDisplayStatus } = useContext(NavContext);

  const {
    navTopToolbarHeight,
    workspaceTopToolbarHeight,
    workspaceMarginLeft,
    workspaceScrollTop,
    workspaceScrollDirection,
  } = useContext(WorkspaceContext);

  const { isMobile } = useNavDisplayMetadata();

  const workspaceScrollCallback = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const newWorkspaceScrollTop = e.currentTarget.scrollTop;
      if (newWorkspaceScrollTop === workspaceScrollTop) {
        return;
      }

      let newWorkspaceScrollDirection = workspaceScrollDirection;
      if (newWorkspaceScrollTop > workspaceScrollTop) {
        newWorkspaceScrollDirection = ScrollDirection.down;
      } else if (newWorkspaceScrollTop < workspaceScrollTop) {
        newWorkspaceScrollDirection = ScrollDirection.up;
      }

      setWorkspaceScrollTop(newWorkspaceScrollTop);
      if (newWorkspaceScrollDirection !== workspaceScrollDirection) {
        setWorkspaceScrollDirection(newWorkspaceScrollDirection);
      }
    },
    [
      setWorkspaceScrollDirection,
      setWorkspaceScrollTop,
      workspaceScrollDirection,
      workspaceScrollTop,
    ],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ml: workspaceMarginLeft,
        height: `calc(100% - ${
          navTopToolbarHeight + workspaceTopToolbarHeight
        }px)`,
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
          pt: (t) => t.spacing(1),
          px: (t) =>
            isMobile ||
            navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.hidden
              ? t.spacing(1)
              : t.spacing(WORKSPACE_PADDING_X_SPACING),
          ...contentSx,
        }}
        onScroll={workspaceScrollCallback}
      >
        {children}
      </Box>
    </Box>
  );
};
