import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import type React from 'react';
import { useCallback, useContext, useRef } from 'react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import {
  ScrollDirection,
  WorkspaceContext,
} from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';

export const CSS_CLASSNAME__WORKSPACE_CONTENT_BOX = 'workspace-content-box';

export type WorkspaceContentBoxProps = {
  setIsWorkspaceScroll: (isWorkspaceScroll: boolean) => void;
  setWorkspaceScrollTop: (scrollTop: number) => void;
  setWorkspaceScrollDirection: (scrollDirection?: ScrollDirection) => void;
  contentSx?: BoxProps['sx'];
  children: React.ReactNode;
};

/**
 * Scrollable workspace content region — lays out beneath the appbar and drawers
 * and reports its scroll position and direction up via callbacks.
 * @param props - Component props.
 * @param props.setIsWorkspaceScroll - Reports whether the content is scrolled.
 * @param props.setWorkspaceScrollTop - Reports the current scroll offset.
 * @param props.setWorkspaceScrollDirection - Reports the current scroll direction.
 * @param props.contentSx - `sx` overrides for the content container.
 * @param props.children - Workspace content to render.
 * @returns The scrollable content region.
 */
export function WorkspaceContentBox({
  setIsWorkspaceScroll,
  setWorkspaceScrollTop,
  setWorkspaceScrollDirection,
  contentSx,
  children,
}: WorkspaceContentBoxProps): React.ReactNode {
  const {
    navLeftDrawerDisplayStatus,
    workspaceTopToolbarPaddingYSpacing,
    workspacePaddingXSpacing,
  } = useContext(NavContext);

  const {
    navTopToolbarHeight,
    workspaceTopToolbarHeight,
    workspaceMarginLeft,
    workspaceMarginRight,
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
        mr: workspaceMarginRight,
        ml: workspaceMarginLeft,
        height: (t) =>
          `calc(100% - ${
            navTopToolbarHeight + workspaceTopToolbarHeight
          }px - ${t.spacing(workspaceTopToolbarPaddingYSpacing * 2)})`,
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
      className={CSS_CLASSNAME__WORKSPACE_CONTENT_BOX}
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
}
