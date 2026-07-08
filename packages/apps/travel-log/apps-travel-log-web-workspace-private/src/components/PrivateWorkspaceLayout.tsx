import type React from 'react';
import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
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
import {
  WorkspaceLayout,
  WorkspaceSlotBox,
  WorkspaceSlotName,
} from '@js-modules/web-react-mui-workspace';
import { useWebRouter } from '@js-modules/web-react-router';
import { PrivateWorkspaceNavDrawerContentBox } from './PrivateWorkspaceNavDrawerContentBox';
import { PrivateWorkspaceNavToolbarActionsBox } from './PrivateWorkspaceNavToolbarActionsBox';

export const PrivateWorkspaceLayout: React.FunctionComponent = () => {
  const { pathname } = useWebRouter();
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
    <WorkspaceLayout
      shortLogo={<TravelLogLogoShortBox />}
      longLogo={<TravelLogLogoLongBox />}
      homePath="/"
      navTopToolbar={
        <TravelLogNavToolbar
          navActions={<PrivateWorkspaceNavToolbarActionsBox />}
        />
      }
      navLeftDrawerContent={<PrivateWorkspaceNavDrawerContentBox />}
      navLeftDrawerFooter={<TravelLogNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={
        <WorkspaceSlotBox
          name={WorkspaceSlotName.workspaceTopToolbar}
          sx={{ display: 'flex', flexGrow: 1, minWidth: 0 }}
        />
      }
      isAuthorizedRequired
      getIsAuthorizedCallback={getIsAuthorizedCallback}
      onNotAuthorizedCallback={stateAuthLoginCallback}
    >
      <Outlet />
    </WorkspaceLayout>
  );
};
