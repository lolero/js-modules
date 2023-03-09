import React, { useCallback } from 'react';
import { WorkspaceBox, WorkspaceBoxProps } from '@js-modules/web-react-nav';
import {
  TravelLogLogoLongBox,
  TravelLogLogoShortBox,
  TravelLogNavDrawerFooterBox,
  TravelLogNavToolbar,
} from '@js-modules/apps-travel-log-web-components';
import { useSelector } from 'react-redux';
import { selectStateAuthMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { MyWorkspaceNavDrawerContentBox } from './MyWorkspaceNavDrawerContentBox';
import { MyWorkspaceNavToolbarActionsBox } from './MyWorkspaceNavToolbarActionsBox';

export type MyWorkspaceBoxProps = {
  title: string;
} & Pick<
  WorkspaceBoxProps,
  'workspaceTopToolbar' | 'workspaceContent' | 'contentSx'
>;

export const MyWorkspaceBox: React.FunctionComponent<MyWorkspaceBoxProps> = ({
  title,
  workspaceTopToolbar,
  workspaceContent,
  contentSx,
}) => {
  const { isAuthenticated } = useSelector(selectStateAuthMetadata);

  const getIsAuthenticatedCallback = useCallback(() => {
    return isAuthenticated;
  }, [isAuthenticated]);

  return (
    <WorkspaceBox
      shortLogo={<TravelLogLogoShortBox />}
      longLogo={<TravelLogLogoLongBox />}
      homePath="/"
      navTopToolbar={
        <TravelLogNavToolbar
          title={title}
          navActions={<MyWorkspaceNavToolbarActionsBox />}
        />
      }
      navLeftDrawerContent={<MyWorkspaceNavDrawerContentBox />}
      navLeftDrawerFooter={<TravelLogNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={workspaceTopToolbar}
      workspaceContent={workspaceContent}
      isAuthenticatedRequired
      getIsAuthenticatedCallback={getIsAuthenticatedCallback}
      contentSx={contentSx}
    />
  );
};
