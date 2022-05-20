import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useChildNodeSize } from '@js-modules/web-react-hooks';
import { usePrevious } from '@js-modules/common-react-hooks';
import { useNavigate } from 'react-router-dom';
import {
  WorkspaceContext,
  ScrollDirection,
  WorkspaceContextValue,
} from '../contexts/WorkspaceContext';
import WorkspaceToolbarBox from './WorkspaceToolbarBox';
import {
  NAV_DRAWER_WIDTH_COLLAPSED_SPACING,
  WORKSPACE_PADDING_X_SPACING,
} from '../constants/navConstants';
import NavTopBar from './NavTopBar';
import NavSideDrawer from './NavSideDrawer';
import { NavSideDrawerDisplayStatus, NavContext } from '../contexts/NavContext';
import useNavDisplayMetadata from '../hooks/useNavDisplayMetadata';

type Props = {
  topToolbar: React.ReactNode;
  workspaceToolbar: React.ReactNode;
  workspaceContent: React.ReactNode;
  isAuthenticatedRequired?: boolean;
  getIsAuthenticatedCallback?: () => boolean;
  contentSx?: BoxProps['sx'];
};

const WorkspaceBox: React.FunctionComponent<Props> = ({
  topToolbar,
  workspaceToolbar,
  workspaceContent,
  isAuthenticatedRequired,
  getIsAuthenticatedCallback,
  contentSx,
}) => {
  const navigate = useNavigate();

  const {
    nonAuthenticatedRedirectPath,
    navSideDrawerDisplayStatus,
    setNavSideDrawerDisplayStatus,
  } = useContext(NavContext);
  const [contentScrollTop, setContentScrollTop] = useState<number>(0);
  const [contentScrollDirection, setContentScrollDirection] =
    useState<ScrollDirection>();

  const theme = useTheme();

  const { nodeRef: navDrawerRef, nodeWidth: navDrawerWidth } =
    useChildNodeSize<HTMLDivElement>();
  const { nodeRef: navBarRef, nodeHeight: navBarHeight } =
    useChildNodeSize<HTMLDivElement>();
  const { nodeRef: workspaceToolbarRef, nodeHeight: workspaceToolbarHeight } =
    useChildNodeSize<HTMLDivElement>();

  const { isMobile, isTablet } = useNavDisplayMetadata();
  const isMobilePrevious = usePrevious(isMobile);

  const workspaceMarginLeft = useMemo(() => {
    if (isMobile) {
      return '0px';
    }

    if (isTablet) {
      return theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING);
    }

    return `${navDrawerWidth}px`;
  }, [isMobile, isTablet, navDrawerWidth, theme]);

  const workspaceContextValue: WorkspaceContextValue = useMemo(() => {
    return {
      navBarHeight,
      navDrawerWidth,
      workspaceMarginLeft,
      contentScrollDirection,
    };
  }, [
    navBarHeight,
    navDrawerWidth,
    workspaceMarginLeft,
    contentScrollDirection,
  ]);

  const contentScrollCallback = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const newContentScrollTop = e.currentTarget.scrollTop;
      if (newContentScrollTop === contentScrollTop) {
        return;
      }

      let newContentScrollDirection = contentScrollDirection;
      if (newContentScrollTop > contentScrollTop) {
        newContentScrollDirection = ScrollDirection.down;
      } else if (newContentScrollTop < contentScrollTop) {
        newContentScrollDirection = ScrollDirection.up;
      }

      setContentScrollTop(newContentScrollTop);
      if (newContentScrollDirection !== contentScrollDirection) {
        setContentScrollDirection(newContentScrollDirection);
      }
    },
    [contentScrollDirection, contentScrollTop],
  );

  useEffect(() => {
    if (isMobilePrevious && !isMobile) {
      setNavSideDrawerDisplayStatus(NavSideDrawerDisplayStatus.expanded);
    } else if (!isMobilePrevious && isMobile) {
      setNavSideDrawerDisplayStatus(NavSideDrawerDisplayStatus.hidden);
    }
  }, [isMobile, isMobilePrevious, setNavSideDrawerDisplayStatus]);

  if (isAuthenticatedRequired && !getIsAuthenticatedCallback?.()) {
    navigate(nonAuthenticatedRedirectPath);
    return null;
  }

  return (
    <WorkspaceContext.Provider value={workspaceContextValue}>
      <NavTopBar ref={navBarRef}>{topToolbar}</NavTopBar>
      <NavSideDrawer ref={navDrawerRef} />
      <WorkspaceToolbarBox ref={workspaceToolbarRef}>
        {workspaceToolbar}
      </WorkspaceToolbarBox>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ml: workspaceMarginLeft,
          height: `calc(100% - ${navBarHeight + workspaceToolbarHeight}px)`,
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Box
          sx={{
            height: '100%',
            overflow: 'auto',
            pt: theme.spacing(1),
            px:
              isMobile ||
              navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.hidden
                ? theme.spacing(1)
                : theme.spacing(WORKSPACE_PADDING_X_SPACING),
            ...contentSx,
          }}
          onScroll={contentScrollCallback}
        >
          {workspaceContent}
        </Box>
      </Box>
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceBox;
