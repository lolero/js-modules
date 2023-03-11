import React, { useContext, useEffect, useMemo, useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useChildNodeSize } from '@js-modules/web-react-hooks';
import { usePrevious } from '@js-modules/common-react-hooks';
import { useNavigate } from 'react-router-dom';
import {
  WorkspaceContext,
  ScrollDirection,
  WorkspaceContextValue,
} from '../contexts/WorkspaceContext';
import { WorkspaceTopToolbarBox } from './WorkspaceTopToolbarBox';
import { NavTopAppbar } from './NavTopAppbar';
import { NavLeftDrawer } from './NavLeftDrawer';
import { NavDrawerDisplayStatus, NavContext } from '../contexts/NavContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { WorkspaceContentBox } from './WorkspaceContentBox';
import { NavRightDrawer } from './NavRightDrawer';

export type WorkspaceBoxProps = {
  shortLogo: React.ReactNode;
  longLogo: React.ReactNode;
  homePath: string;
  navTopToolbar: React.ReactNode;
  navLeftDrawerContent?: React.ReactNode;
  navLeftDrawerFooter?: React.ReactNode;
  navRightDrawerContent?: React.ReactNode;
  navRightDrawerFooter?: React.ReactNode;
  workspaceTopToolbar: React.ReactNode;
  workspaceContent: React.ReactNode;
  isAuthenticatedRequired?: boolean;
  getIsAuthenticatedCallback?: () => boolean;
  onNotAuthenticatedCallback?: () => void;
  contentSx?: BoxProps['sx'];
};

export const WorkspaceBox: React.FC<WorkspaceBoxProps> = ({
  shortLogo,
  longLogo,
  homePath,
  navTopToolbar,
  navLeftDrawerContent,
  navLeftDrawerFooter,
  navRightDrawerContent,
  navRightDrawerFooter,
  workspaceTopToolbar,
  workspaceContent,
  isAuthenticatedRequired,
  getIsAuthenticatedCallback,
  onNotAuthenticatedCallback,
  contentSx,
}) => {
  const navigate = useNavigate();

  const {
    nonAuthenticatedRedirectPath,
    setNavLeftDrawerDisplayStatus,
    navLeftDrawerCollapsedWidth,
  } = useContext(NavContext);
  const [isWorkspaceScroll, setIsWorkspaceScroll] = useState<boolean>(false);
  const [workspaceScrollTop, setWorkspaceScrollTop] = useState<number>(0);
  const [workspaceScrollDirection, setWorkspaceScrollDirection] =
    useState<ScrollDirection>();

  const { nodeRef: navTopToolbarRef, nodeHeight: navTopToolbarHeight } =
    useChildNodeSize<HTMLDivElement>();
  const { nodeRef: navLeftDrawerRef, nodeWidth: navLeftDrawerWidth } =
    useChildNodeSize<HTMLDivElement>();
  const { nodeRef: navRightDrawerRef, nodeWidth: navRightDrawerWidth } =
    useChildNodeSize<HTMLDivElement>();
  const {
    nodeRef: workspaceTopToolbarRef,
    nodeHeight: workspaceTopToolbarHeight,
  } = useChildNodeSize<HTMLDivElement>();

  const { isMobile, isTablet } = useNavDisplayMetadata();
  const isMobilePrevious = usePrevious(isMobile);

  const isNavLeftDrawerWithContent = useMemo(() => {
    return !!navLeftDrawerContent || !!navLeftDrawerFooter;
  }, [navLeftDrawerContent, navLeftDrawerFooter]);

  const isNavRightDrawerWithContent = useMemo(() => {
    return !!navRightDrawerContent || !!navRightDrawerFooter;
  }, [navRightDrawerContent, navRightDrawerFooter]);

  const workspaceMarginLeft = useMemo(() => {
    if (isMobile) {
      return '0px';
    }

    if (isTablet) {
      return navLeftDrawerCollapsedWidth;
    }

    return `${navLeftDrawerWidth}px`;
  }, [isMobile, isTablet, navLeftDrawerCollapsedWidth, navLeftDrawerWidth]);

  const workspaceMarginRight = useMemo(() => {
    if (isMobile) {
      return '0px';
    }

    if (isTablet) {
      return navLeftDrawerCollapsedWidth;
    }

    return `${navLeftDrawerWidth}px`;
  }, [isMobile, isTablet, navLeftDrawerCollapsedWidth, navLeftDrawerWidth]);

  const workspaceContextValue: WorkspaceContextValue = useMemo(() => {
    return {
      navTopToolbarHeight,
      navLeftDrawerWidth,
      navRightDrawerWidth,
      workspaceTopToolbarHeight,
      workspaceMarginLeft,
      workspaceMarginRight,
      isWorkspaceScroll,
      workspaceScrollTop,
      workspaceScrollDirection,
    };
  }, [
    navTopToolbarHeight,
    navLeftDrawerWidth,
    navRightDrawerWidth,
    workspaceTopToolbarHeight,
    workspaceMarginLeft,
    workspaceMarginRight,
    isWorkspaceScroll,
    workspaceScrollTop,
    workspaceScrollDirection,
  ]);

  useEffect(() => {
    if (isMobilePrevious && !isMobile) {
      setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.expanded);
    } else if (!isMobilePrevious && isMobile) {
      setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
    }
  }, [isMobile, isMobilePrevious, setNavLeftDrawerDisplayStatus]);

  useEffect(() => {
    if (isAuthenticatedRequired && !getIsAuthenticatedCallback?.()) {
      if (onNotAuthenticatedCallback) {
        onNotAuthenticatedCallback();
      } else {
        navigate(nonAuthenticatedRedirectPath, { replace: true });
      }
    }
  }, [
    getIsAuthenticatedCallback,
    isAuthenticatedRequired,
    navigate,
    nonAuthenticatedRedirectPath,
    onNotAuthenticatedCallback,
  ]);

  if (isAuthenticatedRequired && !getIsAuthenticatedCallback?.()) {
    return null;
  }

  return (
    <WorkspaceContext.Provider value={workspaceContextValue}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <NavTopAppbar
          ref={navTopToolbarRef}
          shortLogo={shortLogo}
          longLogo={longLogo}
          isNavLeftDrawerWithContent={isNavLeftDrawerWithContent}
          homePath={homePath}
        >
          {navTopToolbar}
        </NavTopAppbar>
        {isNavLeftDrawerWithContent && (
          <NavLeftDrawer
            ref={navLeftDrawerRef}
            navLeftDrawerContent={navLeftDrawerContent}
            navLeftDrawerFooter={navLeftDrawerFooter}
          />
        )}
        {isNavRightDrawerWithContent && (
          <NavRightDrawer
            ref={navRightDrawerRef}
            navRightDrawerContent={navRightDrawerContent}
            navRightDrawerFooter={navRightDrawerFooter}
          />
        )}
        <WorkspaceTopToolbarBox ref={workspaceTopToolbarRef}>
          {workspaceTopToolbar}
        </WorkspaceTopToolbarBox>
        <WorkspaceContentBox
          setIsWorkspaceScroll={setIsWorkspaceScroll}
          setWorkspaceScrollTop={setWorkspaceScrollTop}
          setWorkspaceScrollDirection={setWorkspaceScrollDirection}
          contentSx={contentSx}
        >
          {workspaceContent}
        </WorkspaceContentBox>
      </Box>
    </WorkspaceContext.Provider>
  );
};
