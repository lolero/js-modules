import React, { useCallback } from 'react';
import { WorkspaceBox, WorkspaceBoxProps } from '@js-modules/web-react-nav';
import {
  TravelLogLogoLongBox,
  TravelLogLogoShortBox,
  TravelLogNavDrawerFooterBox,
  TravelLogNavToolbar,
} from '@js-modules/apps-travel-log-web-components';
import {
  useStateAuthLogin,
  useStateAuthReducerMetadata,
  useStateSettingsGetProfile,
} from '@js-modules/apps-travel-log-common-store-redux';
import { useLocation } from 'react-router-dom';
import { WEB_CLIENT_URI_TRAVEL_LOG } from '@js-modules/apps-travel-log-common-constants';
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
  const { pathname } = useLocation();
  const { isAuthenticated } = useStateAuthReducerMetadata();

  const { callback: stateSettingsGetProfileCallback } =
    useStateSettingsGetProfile();

  const { callback: stateAuthLoginCallback } = useStateAuthLogin(
    WEB_CLIENT_URI_TRAVEL_LOG,
    pathname,
    stateSettingsGetProfileCallback,
  );

  const getIsAuthorizedCallback = useCallback(() => {
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
      isAuthorizedRequired
      getIsAuthorizedCallback={getIsAuthorizedCallback}
      onNotAuthorizedCallback={stateAuthLoginCallback}
      contentSx={contentSx}
    />
  );
};
