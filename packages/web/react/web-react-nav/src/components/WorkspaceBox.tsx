import React, { useContext, useEffect, useMemo, useState } from 'react';
import { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useChildNodeSize } from '@js-modules/web-react-hooks';
import { usePrevious } from '@js-modules/common-react-hooks';
import { useNavigate } from 'react-router-dom';
import {
  WorkspaceContext,
  ScrollDirection,
  WorkspaceContextValue,
} from '../contexts/WorkspaceContext';
import WorkspaceTopToolbarBox from './WorkspaceTopToolbarBox';
import { NAV_DRAWER_WIDTH_COLLAPSED_SPACING } from '../constants/navConstants';
import { NavTopAppbar } from './NavTopAppbar';
import { NavLeftDrawer } from './NavLeftDrawer';
import { NavDrawerDisplayStatus, NavContext } from '../contexts/NavContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { WorkspaceContentBox } from './WorkspaceContentBox';

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
  contentSx?: BoxProps['sx'];
};

export const WorkspaceBox: React.FunctionComponent<WorkspaceBoxProps> = ({
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
  contentSx,
}) => {
  const navigate = useNavigate();

  const { nonAuthenticatedRedirectPath, setNavLeftDrawerDisplayStatus } =
    useContext(NavContext);
  const [workspaceScrollTop, setWorkspaceScrollTop] = useState<number>(0);
  const [workspaceScrollDirection, setWorkspaceScrollDirection] =
    useState<ScrollDirection>();

  const theme = useTheme();

  const { nodeRef: navLeftDrawerRef, nodeWidth: navLeftDrawerWidth } =
    useChildNodeSize<HTMLDivElement>();
  const { nodeRef: navRightDrawerRef, nodeWidth: navRightDrawerWidth } =
    useChildNodeSize<HTMLDivElement>();
  const { nodeRef: navTopToolbarRef, nodeHeight: navTopToolbarHeight } =
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
      return theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING);
    }

    return `${navLeftDrawerWidth}px`;
  }, [isMobile, isTablet, navLeftDrawerWidth, theme]);

  const workspaceMarginRight = useMemo(() => {
    if (isMobile) {
      return '0px';
    }

    if (isTablet) {
      return theme.spacing(NAV_DRAWER_WIDTH_COLLAPSED_SPACING);
    }

    return `${navLeftDrawerWidth}px`;
  }, [isMobile, isTablet, navLeftDrawerWidth, theme]);

  const workspaceContextValue: WorkspaceContextValue = useMemo(() => {
    return {
      navTopToolbarHeight,
      navLeftDrawerWidth,
      navRightDrawerWidth,
      workspaceTopToolbarHeight,
      workspaceMarginLeft,
      workspaceMarginRight,
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

  if (isAuthenticatedRequired && !getIsAuthenticatedCallback?.()) {
    navigate(nonAuthenticatedRedirectPath);
    return null;
  }

  return (
    <WorkspaceContext.Provider value={workspaceContextValue}>
      <NavTopAppbar
        ref={navTopToolbarRef}
        shortLogo={shortLogo}
        longLogo={longLogo}
        isNavLeftDrawerWithContent={
          !!navLeftDrawerContent || !!navLeftDrawerFooter
        }
        homePath={homePath}
      >
        {navTopToolbar}
      </NavTopAppbar>
      {isNavLeftDrawerWithContent && <NavLeftDrawer ref={navLeftDrawerRef} />}
      {isNavRightDrawerWithContent && (
        <NavRightDrawer ref={navRightDrawerRef} />
      )}
      <WorkspaceTopToolbarBox ref={workspaceTopToolbarRef}>
        {workspaceTopToolbar}
      </WorkspaceTopToolbarBox>
      <WorkspaceContentBox
        setWorkspaceScrollTop={setWorkspaceScrollTop}
        setWorkspaceScrollDirection={setWorkspaceScrollDirection}
        contentSx={contentSx}
      >
        {workspaceContent}
      </WorkspaceContentBox>
    </WorkspaceContext.Provider>
  );
};
