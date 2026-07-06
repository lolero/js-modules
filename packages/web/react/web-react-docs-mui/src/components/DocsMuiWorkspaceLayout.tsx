import type React from 'react';
import { Outlet } from 'react-router-dom';
import { WorkspaceLayout } from '@js-modules/web-react-mui-workspace';
import { DocsMuiLogoLongBox } from './DocsMuiLogoLongBox';
import { DocsMuiLogoShortBox } from './DocsMuiLogoShortBox';
import { DocsMuiNavDrawerContentBox } from './DocsMuiNavDrawerContentBox';
import { DocsMuiNavDrawerFooterBox } from './DocsMuiNavDrawerFooterBox';
import { DocsMuiNavTopToolbar } from './DocsMuiNavTopToolbar';

export function DocsMuiWorkspaceLayout(): React.ReactNode {
  return (
    <WorkspaceLayout
      shortLogo={<DocsMuiLogoShortBox />}
      longLogo={<DocsMuiLogoLongBox />}
      homePath={`/`}
      navTopToolbar={<DocsMuiNavTopToolbar />}
      navLeftDrawerContent={<DocsMuiNavDrawerContentBox />}
      navLeftDrawerFooter={<DocsMuiNavDrawerFooterBox />}
      workspaceTopToolbar={null}
    >
      <Outlet />
    </WorkspaceLayout>
  );
}
