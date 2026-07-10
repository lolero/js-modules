import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type React from 'react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { usePrevious } from '@js-modules/common-react-utils';
import { useWebRouter } from '@js-modules/web-react-router';
import { useChildNodeSize } from '@js-modules/web-react-utils';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import type {
  ScrollDirection,
  WorkspaceContextValue,
} from '../contexts/WorkspaceContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { NavLeftDrawer } from './NavLeftDrawer';
import { NavRightDrawer } from './NavRightDrawer';
import { NavRightDrawerDisplayButton } from './NavRightDrawerDisplayButton';
import { NavTopAppbar } from './NavTopAppbar';
import { WorkspaceContentBox } from './WorkspaceContentBox';
import { WorkspaceTopToolbarBox } from './WorkspaceTopToolbarBox';

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
  isAuthorizedRequired?: boolean;
  getIsAuthorizedCallback?: () => boolean;
  onNotAuthorizedCallback?: () => void;
  contentSx?: BoxProps['sx'];
};

/**
 * The app workspace shell: top appbar, optional left/right nav drawers, the
 * workspace top toolbar, and scrollable content — with optional authorization
 * gating.
 * @param props - Component props.
 * @param props.shortLogo - Logo shown when the left drawer is collapsed or on mobile.
 * @param props.longLogo - Logo shown when the left drawer is expanded.
 * @param props.homePath - Path the logo links to.
 * @param props.navTopToolbar - Content of the top appbar toolbar.
 * @param props.navLeftDrawerContent - Left nav drawer body; omit to hide the left drawer.
 * @param props.navLeftDrawerFooter - Left nav drawer footer.
 * @param props.navRightDrawerContent - Right nav drawer body; omit to hide the right drawer.
 * @param props.navRightDrawerFooter - Right nav drawer footer.
 * @param props.workspaceTopToolbar - Content of the workspace top toolbar.
 * @param props.workspaceContent - Main scrollable workspace content.
 * @param props.isAuthorizedRequired - Whether the workspace requires authorization to render.
 * @param props.getIsAuthorizedCallback - Returns whether the current user is authorized.
 * @param props.onNotAuthorizedCallback - Called when unauthorized; defaults to redirecting.
 * @param props.contentSx - `sx` overrides for the content container.
 * @returns The workspace layout shell.
 */
export function WorkspaceBox({
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
  isAuthorizedRequired,
  getIsAuthorizedCallback,
  onNotAuthorizedCallback,
  contentSx,
}: WorkspaceBoxProps): React.ReactNode {
  const { pathReplace } = useWebRouter();

  const {
    nonAuthorizedRedirectPath,
    setNavLeftDrawerDisplayStatus,
    navLeftDrawerCollapsedWidth,
    navRightDrawerCollapsedWidth,
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
      return navRightDrawerCollapsedWidth;
    }

    return `${navRightDrawerWidth}px`;
  }, [isMobile, isTablet, navRightDrawerCollapsedWidth, navRightDrawerWidth]);

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
    if (isAuthorizedRequired && !getIsAuthorizedCallback?.()) {
      if (onNotAuthorizedCallback) {
        onNotAuthorizedCallback();
      } else {
        pathReplace(nonAuthorizedRedirectPath);
      }
    }
  }, [
    getIsAuthorizedCallback,
    isAuthorizedRequired,
    pathReplace,
    nonAuthorizedRedirectPath,
    onNotAuthorizedCallback,
  ]);

  if (isAuthorizedRequired && !getIsAuthorizedCallback?.()) {
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
          <>
            <NavRightDrawerDisplayButton />
            <NavRightDrawer
              ref={navRightDrawerRef}
              navRightDrawerContent={navRightDrawerContent}
              navRightDrawerFooter={navRightDrawerFooter}
            />
          </>
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
}
