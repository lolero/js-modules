import React from 'react';
import { WorkspaceBox, WorkspaceBoxProps } from '@js-modules/web-react-nav';
import {
  VendingMachineLogoLongBox,
  VendingMachineLogoShortBox,
  VendingMachineNavDrawerFooterBox,
  VendingMachineNavToolbar,
} from '@js-modules/apps-vending-machine-web-components';
import { PublicWorkspaceNavDrawerContentBox } from './PublicWorkspaceNavDrawerContentBox';
import { PublicNavToolbarActionsBox } from './PublicNavToolbarActionsBox';

export type MyWorkspaceBoxProps = {
  title: string;
} & Pick<WorkspaceBoxProps, 'workspaceContent'>;

export const PublicWorkspaceBox: React.FunctionComponent<
  MyWorkspaceBoxProps
> = ({ title, workspaceContent }) => {
  return (
    <WorkspaceBox
      shortLogo={<VendingMachineLogoShortBox />}
      longLogo={<VendingMachineLogoLongBox />}
      homePath="/"
      navTopToolbar={
        <VendingMachineNavToolbar
          title={title}
          navActions={<PublicNavToolbarActionsBox />}
        />
      }
      navLeftDrawerContent={<PublicWorkspaceNavDrawerContentBox />}
      navLeftDrawerFooter={<VendingMachineNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={null}
      workspaceContent={workspaceContent}
    />
  );
};
