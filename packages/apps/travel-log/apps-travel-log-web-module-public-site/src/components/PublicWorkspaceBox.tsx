import React from 'react';
import { WorkspaceBox, WorkspaceBoxProps } from '@js-modules/web-react-nav';
import {
  TravelLogLogoLongBox,
  TravelLogLogoShortBox,
  TravelLogNavDrawerFooterBox,
  TravelLogNavToolbar,
} from '@js-modules/apps-travel-log-web-utils';
import { PublicWorkspaceNavDrawerContentBox } from './PublicWorkspaceNavDrawerContentBox';
import { PublicNavToolbarActionsBox } from './PublicNavToolbarActionsBox';

export type PublicWorkspaceBoxProps = {
  title: string;
} & Pick<WorkspaceBoxProps, 'workspaceContent'>;

export const PublicWorkspaceBox: React.FunctionComponent<
  PublicWorkspaceBoxProps
> = ({ title, workspaceContent }) => {
  return (
    <WorkspaceBox
      shortLogo={<TravelLogLogoShortBox />}
      longLogo={<TravelLogLogoLongBox />}
      homePath="/"
      navTopToolbar={
        <TravelLogNavToolbar
          title={title}
          navActions={<PublicNavToolbarActionsBox />}
        />
      }
      navLeftDrawerContent={<PublicWorkspaceNavDrawerContentBox />}
      navLeftDrawerFooter={<TravelLogNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={null}
      workspaceContent={workspaceContent}
    />
  );
};
