import type React from 'react';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  NavLeftDrawerTreeView,
  useNavLeftDrawerTreeViewMetadata,
} from '@js-modules/web-react-nav';

export const PrivateWorkspaceNavDrawerContentBox: React.FunctionComponent =
  () => {
    const treeViewMetadata = useNavLeftDrawerTreeViewMetadata(
      routesMetadataPrivate,
    );

    return <NavLeftDrawerTreeView treeViewMetadata={treeViewMetadata} />;
  };
