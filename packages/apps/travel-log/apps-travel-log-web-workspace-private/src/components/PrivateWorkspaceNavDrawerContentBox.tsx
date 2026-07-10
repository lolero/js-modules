import type React from 'react';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  NavLeftDrawerTreeView,
  useNavLeftDrawerTreeViewMetadata,
} from '@js-modules/web-react-mui-workspace';

export function PrivateWorkspaceNavDrawerContentBox(): React.ReactNode {
  const treeViewMetadata = useNavLeftDrawerTreeViewMetadata(
    routesMetadataPrivate,
  );

  return <NavLeftDrawerTreeView treeViewMetadata={treeViewMetadata} />;
}
