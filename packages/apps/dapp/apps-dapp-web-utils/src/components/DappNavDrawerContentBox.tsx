import type React from 'react';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import {
  NavLeftDrawerTreeView,
  useNavLeftDrawerTreeViewMetadata,
} from '@js-modules/web-react-mui-workspace';

export function DappNavDrawerContentBox(): React.ReactNode {
  const treeViewMetadata = useNavLeftDrawerTreeViewMetadata(
    routesMetadataPrivate,
  );

  return <NavLeftDrawerTreeView treeViewMetadata={treeViewMetadata} />;
}
