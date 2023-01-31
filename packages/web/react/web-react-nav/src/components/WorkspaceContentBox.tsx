import React, { useCallback, useContext, useRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { MuiFaIcon } from '@js-modules/web-react-components';
import {
  WorkspaceContext,
  ScrollDirection,
} from '../contexts/WorkspaceContext';
import { NavDrawerDisplayStatus, NavContext } from '../contexts/NavContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

export type WorkspaceContentBoxProps = {
  setIsWorkspaceScroll: (isWorkspaceScroll: boolean) => void;
  setWorkspaceScrollTop: (scrollTop: number) => void;
  setWorkspaceScrollDirection: (scrollDirection?: ScrollDirection) => void;
  contentSx?: BoxProps['sx'];
  children: React.ReactNode;
};

export const WorkspaceContentBox: React.FunctionComponent<
  WorkspaceContentBoxProps
> = ({
  setIsWorkspaceScroll,
  setWorkspaceScrollTop,
  setWorkspaceScrollDirection,
  contentSx,
  children,
}) => {
  const {
    navLeftDrawerDisplayStatus,
    workspaceTopToolbarPaddingYSpacing,
    workspacePaddingXSpacing,
  } = useContext(NavContext);

  const {
    navTopToolbarHeight,
    workspaceTopToolbarHeight,
    workspaceMarginLeft,
    isWorkspaceScroll,
    workspaceScrollTop,
    workspaceScrollDirection,
  } = useContext(WorkspaceContext);

  const { isMobile } = useNavDisplayMetadata();

  const scrollableBoxRef = useRef<HTMLDivElement>(null);

  const workspaceScrollCallback = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const newWorkspaceScrollTop = e.currentTarget.scrollTop;
      if (newWorkspaceScrollTop === workspaceScrollTop) {
        return;
      }

      const newIsWorkspaceScroll = newWorkspaceScrollTop > 0;

      let newWorkspaceScrollDirection = workspaceScrollDirection;
      if (newWorkspaceScrollTop > workspaceScrollTop) {
        newWorkspaceScrollDirection = ScrollDirection.down;
      } else if (newWorkspaceScrollTop < workspaceScrollTop) {
        newWorkspaceScrollDirection = ScrollDirection.up;
      }

      setWorkspaceScrollTop(newWorkspaceScrollTop);
      if (newIsWorkspaceScroll !== isWorkspaceScroll) {
        setIsWorkspaceScroll(newIsWorkspaceScroll);
      }
      if (newWorkspaceScrollDirection !== workspaceScrollDirection) {
        setWorkspaceScrollDirection(newWorkspaceScrollDirection);
      }
    },
    [
      isWorkspaceScroll,
      setIsWorkspaceScroll,
      setWorkspaceScrollDirection,
      setWorkspaceScrollTop,
      workspaceScrollDirection,
      workspaceScrollTop,
    ],
  );

  const scrollToTopCallback = useCallback(() => {
    scrollableBoxRef?.current?.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ml: workspaceMarginLeft,
        height: (t) =>
          `calc(100% - ${
            navTopToolbarHeight + workspaceTopToolbarHeight
          }px - ${t.spacing(workspaceTopToolbarPaddingYSpacing * 2)})`,
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
              : t.spacing(workspacePaddingXSpacing),
          ...contentSx,
        }}
        ref={scrollableBoxRef}
        onScroll={workspaceScrollCallback}
      >
        {children}
      </Box>
      {isWorkspaceScroll && (
        <IconButton
          sx={{
            position: 'fixed',
            bottom: '4px',
            right: '20px',
          }}
          onClick={scrollToTopCallback}
        >
          <MuiFaIcon icon={faAngleUp} />
        </IconButton>
      )}
    </Box>
  );
};
