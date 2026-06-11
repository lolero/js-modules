import type React from 'react';
import { Outlet } from 'react-router-dom';
import {
  TravelLogLogoLongBox,
  TravelLogLogoShortBox,
  TravelLogNavDrawerFooterBox,
  TravelLogNavToolbar,
} from '@js-modules/apps-travel-log-web-utils';
import { WorkspaceLayout } from '@js-modules/web-react-nav';
import { PublicNavToolbarActionsBox } from './PublicNavToolbarActionsBox';
import { PublicWorkspaceNavDrawerContentBox } from './PublicWorkspaceNavDrawerContentBox';

export const PublicWorkspaceLayout: React.FunctionComponent = () => {
  return (
    <WorkspaceLayout
      shortLogo={<TravelLogLogoShortBox />}
      longLogo={<TravelLogLogoLongBox />}
      homePath="/"
      navTopToolbar={
        <TravelLogNavToolbar navActions={<PublicNavToolbarActionsBox />} />
      }
      navLeftDrawerContent={<PublicWorkspaceNavDrawerContentBox />}
      navLeftDrawerFooter={<TravelLogNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={null}
    >
      <Outlet />
    </WorkspaceLayout>
  );
};
