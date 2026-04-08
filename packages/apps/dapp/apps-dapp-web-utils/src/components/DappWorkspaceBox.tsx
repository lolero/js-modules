import type React from 'react';
import type { WorkspaceBoxProps } from '@js-modules/web-react-nav';
import { WorkspaceBox } from '@js-modules/web-react-nav';
import { DappLogoLongBox } from './DappLogoLongBox';
import { DappLogoShortBox } from './DappLogoShortBox';
import { DappNavDrawerContentBox } from './DappNavDrawerContentBox';
import { DappNavDrawerFooterBox } from './DappNavDrawerFooterBox';
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
