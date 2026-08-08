import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import type React from 'react';
import { useContext, useRef } from 'react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { NavContext } from '../contexts/NavContext';
import {
  ScrollDirection,
  WorkspaceContext,
} from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { CSS_CLASSNAME__WORKSPACE_CONTENT_BOX } from '../styles/cssClassNames';

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
  const { workspaceTopToolbarPaddingYSpacing, workspacePaddingXSpacing } =
    useContext(NavContext);

  const {
    navTopToolbarHeight,
    workspaceTopToolbarHeight,
    workspaceMarginLeft,
    workspaceMarginRight,
    isWorkspaceScroll,
    workspaceScrollTop,
    workspaceScrollDirection,
  } = useContext(WorkspaceContext);

  const { isMobile, isNavLeftDrawerHidden } = useNavDisplayMetadata();

  const theme = useTheme();

  const scrollableBoxRef = useRef<HTMLDivElement>(null);

  function workspaceScrollCallback(e: React.UIEvent<HTMLDivElement>): void {
    const workspaceScrollTopNew = e.currentTarget.scrollTop;
    if (workspaceScrollTopNew === workspaceScrollTop) {
      return;
    }

    const isWorkspaceScrollNew = workspaceScrollTopNew > 0;

    let workspaceScrollDirectionNew = workspaceScrollDirection;
    if (workspaceScrollTopNew > workspaceScrollTop) {
      workspaceScrollDirectionNew = ScrollDirection.down;
    } else if (workspaceScrollTopNew < workspaceScrollTop) {
      workspaceScrollDirectionNew = ScrollDirection.up;
    }

    setWorkspaceScrollTop(workspaceScrollTopNew);
    if (isWorkspaceScrollNew !== isWorkspaceScroll) {
      setIsWorkspaceScroll(isWorkspaceScrollNew);
    }
    if (workspaceScrollDirectionNew !== workspaceScrollDirection) {
      setWorkspaceScrollDirection(workspaceScrollDirectionNew);
    }
  }

  function scrollToTopCallback(): void {
    scrollableBoxRef?.current?.scrollTo(0, 0);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        mr: workspaceMarginRight,
        ml: workspaceMarginLeft,
        height: `calc(100% - ${
          navTopToolbarHeight + workspaceTopToolbarHeight
        }px - ${theme.spacing(workspaceTopToolbarPaddingYSpacing * 2)})`,
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
      className={CSS_CLASSNAME__WORKSPACE_CONTENT_BOX}
    >
      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
          pt: 1,
          px: isMobile || isNavLeftDrawerHidden ? 1 : workspacePaddingXSpacing,
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
