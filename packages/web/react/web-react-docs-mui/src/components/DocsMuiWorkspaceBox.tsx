import type React from 'react';
import type { WorkspaceBoxProps } from '@js-modules/web-react-nav';
import { WorkspaceBox } from '@js-modules/web-react-nav';
import { DocsMuiLogoLongBox } from './DocsMuiLogoLongBox';
import { DocsMuiLogoShortBox } from './DocsMuiLogoShortBox';
import { DocsMuiNavDrawerContentBox } from './DocsMuiNavDrawerContentBox';
import { DocsMuiNavToolbar } from './DocsMuiNavToolbar';

export type DocsMuiWorkspaceBoxProps = {
  title: string;
} & Pick<WorkspaceBoxProps, 'workspaceContent'>;

export function DocsMuiWorkspaceBox({
  title,
  workspaceContent,
}: DocsMuiWorkspaceBoxProps): React.ReactNode {
  return (
    <WorkspaceBox
      shortLogo={<DocsMuiLogoShortBox />}
      longLogo={<DocsMuiLogoLongBox />}
      homePath={`/`}
      navTopToolbar={<DocsMuiNavToolbar title={title} />}
      navLeftDrawerContent={<DocsMuiNavDrawerContentBox />}
      navLeftDrawerFooter={null}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={null}
      workspaceContent={workspaceContent}
    />
  );
}
