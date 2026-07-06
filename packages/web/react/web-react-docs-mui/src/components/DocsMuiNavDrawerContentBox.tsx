import type React from 'react';
import {
  NavLeftDrawerTreeView,
  useNavLeftDrawerTreeViewMetadata,
} from '@js-modules/web-react-mui-workspace';
import { routesMetadataMui } from '../routesMetadata/routesMetadata';

export function DocsMuiNavDrawerContentBox(): React.ReactNode {
  const treeViewMetadata = useNavLeftDrawerTreeViewMetadata(routesMetadataMui);

  return <NavLeftDrawerTreeView treeViewMetadata={treeViewMetadata} />;
}
