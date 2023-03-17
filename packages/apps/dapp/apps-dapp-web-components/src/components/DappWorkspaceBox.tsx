import React from 'react';
import { WorkspaceBox, WorkspaceBoxProps } from '@js-modules/web-react-nav';
import { DappNavDrawerContentBox } from './DappNavDrawerContentBox';
import { DappNavDrawerFooterBox } from './DappNavDrawerFooterBox';
import { DappLogoShortBox } from './DappLogoShortBox';
import { DappLogoLongBox } from './DappLogoLongBox';
import { DappNavToolbar } from './DappNavToolbar';

export type DappWorkspaceBoxProps = {
  title: string;
} & Pick<
  WorkspaceBoxProps,
  | 'workspaceTopToolbar'
  | 'workspaceContent'
  | 'isAuthorizedRequired'
  | 'contentSx'
>;

export const DappWorkspaceBox: React.FunctionComponent<
  DappWorkspaceBoxProps
> = ({
  title,
  workspaceTopToolbar,
  workspaceContent,
  isAuthorizedRequired,
  contentSx,
}) => {
  return (
    <WorkspaceBox
      shortLogo={<DappLogoShortBox />}
      longLogo={<DappLogoLongBox />}
      homePath="/"
      navTopToolbar={<DappNavToolbar title={title} />}
      navLeftDrawerContent={<DappNavDrawerContentBox />}
      navLeftDrawerFooter={<DappNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={workspaceTopToolbar}
      workspaceContent={workspaceContent}
      isAuthorizedRequired={isAuthorizedRequired}
      getIsAuthorizedCallback={() => true}
      contentSx={contentSx}
    />
  );
};
