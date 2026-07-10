import type React from 'react';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';
import {
  NavLeftDrawerTreeView,
  useNavLeftDrawerTreeViewMetadata,
} from '@js-modules/web-react-mui-workspace';

export function PublicWorkspaceNavDrawerContentBox(): React.ReactNode {
  const treeViewMetadata =
    useNavLeftDrawerTreeViewMetadata(routesMetadataPublic);

  return <NavLeftDrawerTreeView treeViewMetadata={treeViewMetadata} />;
}
