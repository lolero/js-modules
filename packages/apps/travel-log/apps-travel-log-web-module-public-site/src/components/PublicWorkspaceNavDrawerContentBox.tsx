import type React from 'react';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';
import {
  NavLeftDrawerTreeView,
  useNavLeftDrawerTreeViewMetadata,
} from '@js-modules/web-react-mui-workspace';

export const PublicWorkspaceNavDrawerContentBox: React.FunctionComponent =
  () => {
    const treeViewMetadata =
      useNavLeftDrawerTreeViewMetadata(routesMetadataPublic);

    return <NavLeftDrawerTreeView treeViewMetadata={treeViewMetadata} />;
  };
