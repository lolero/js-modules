import type React from 'react';
import { Outlet } from 'react-router-dom';
import {
  WorkspaceLayout,
  WorkspaceSlotBox,
  WorkspaceSlotName,
} from '@js-modules/web-react-mui-workspace';
import { DappLogoLongBox } from './DappLogoLongBox';
import { DappLogoShortBox } from './DappLogoShortBox';
import { DappNavDrawerContentBox } from './DappNavDrawerContentBox';
import { DappNavDrawerFooterBox } from './DappNavDrawerFooterBox';
import { DappNavToolbar } from './DappNavToolbar';

export const DappWorkspaceLayout: React.FunctionComponent = () => {
  return (
    <WorkspaceLayout
      shortLogo={<DappLogoShortBox />}
      longLogo={<DappLogoLongBox />}
      homePath="/"
      navTopToolbar={<DappNavToolbar />}
      workspaceTopToolbar={
        <WorkspaceSlotBox
          name={WorkspaceSlotName.workspaceTopToolbar}
          sx={{ display: 'flex', flexGrow: 1, minWidth: 0 }}
        />
      }
      navLeftDrawerContent={<DappNavDrawerContentBox />}
      navLeftDrawerFooter={<DappNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      getIsAuthorizedCallback={() => true}
    >
      <Outlet />
    </WorkspaceLayout>
  );
};
