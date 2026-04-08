import type React from 'react';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { WEB_CLIENT__URI__TRAVEL_LOG } from '@js-modules/apps-travel-log-common-constants';
import {
  useStateAuthLogin,
  useStateAuthReducerMetadata,
  useStateSettingsGetProfile,
} from '@js-modules/apps-travel-log-common-store-redux';
import {
  TravelLogLogoLongBox,
  TravelLogLogoShortBox,
  TravelLogNavDrawerFooterBox,
  TravelLogNavToolbar,
} from '@js-modules/apps-travel-log-web-utils';
import type { WorkspaceBoxProps } from '@js-modules/web-react-nav';
import { WorkspaceBox } from '@js-modules/web-react-nav';
import { PrivateWorkspaceNavDrawerContentBox } from './PrivateWorkspaceNavDrawerContentBox';
import { PrivateWorkspaceNavToolbarActionsBox } from './PrivateWorkspaceNavToolbarActionsBox';

export type PrivateWorkspaceBoxProps = {
  title: string;
} & Pick<
  WorkspaceBoxProps,
  'workspaceTopToolbar' | 'workspaceContent' | 'contentSx'
>;

export const PrivateWorkspaceBox: React.FunctionComponent<
  PrivateWorkspaceBoxProps
> = ({ title, workspaceTopToolbar, workspaceContent, contentSx }) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useStateAuthReducerMetadata();

  const { callback: stateSettingsGetProfileCallback } =
    useStateSettingsGetProfile();

  const { callback: stateAuthLoginCallback } = useStateAuthLogin(
    {
      redirectUri: `${WEB_CLIENT__URI__TRAVEL_LOG}${pathname}`,
    },
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
          navActions={<PrivateWorkspaceNavToolbarActionsBox />}
        />
      }
      navLeftDrawerContent={<PrivateWorkspaceNavDrawerContentBox />}
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
