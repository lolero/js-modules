import React from 'react';
import { WorkspaceBox, WorkspaceBoxProps } from '@js-modules/web-react-nav';
import { TravelLogNavDrawerContentBox } from './TravelLogNavDrawerContentBox';
import { TravelLogNavDrawerFooterBox } from './TravelLogNavDrawerFooterBox';
import { TravelLogLogoShortBox } from './TravelLogLogoShortBox';
import { TravelLogLogoLongBox } from './TravelLogLogoLongBox';
import { TravelLogNavToolbar } from './TravelLogNavToolbar';

export type TravelLogWorkspaceBoxProps = {
  title: string;
} & Pick<
  WorkspaceBoxProps,
  | 'workspaceTopToolbar'
  | 'workspaceContent'
  | 'isAuthenticatedRequired'
  | 'contentSx'
>;

export const TravelLogWorkspaceBox: React.FunctionComponent<
  TravelLogWorkspaceBoxProps
> = ({
  title,
  workspaceTopToolbar,
  workspaceContent,
  isAuthenticatedRequired,
  contentSx,
}) => {
  return (
    <WorkspaceBox
      shortLogo={<TravelLogLogoShortBox />}
      longLogo={<TravelLogLogoLongBox />}
      homePath="/"
      navTopToolbar={<TravelLogNavToolbar title={title} />}
      navLeftDrawerContent={<TravelLogNavDrawerContentBox />}
      navLeftDrawerFooter={<TravelLogNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={workspaceTopToolbar}
      workspaceContent={workspaceContent}
      isAuthenticatedRequired={isAuthenticatedRequired}
      getIsAuthenticatedCallback={() => true}
      contentSx={contentSx}
    />
  );
};
