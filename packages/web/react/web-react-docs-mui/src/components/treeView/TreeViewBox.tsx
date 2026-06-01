import type React from 'react';
import AdvancedFeatures from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/tree-view/advancedFeatures/AdvancedFeatures';
import Playground from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/tree-view/playground/Playground';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/x/react-tree-view/',
    example: <Playground />,
  },
  {
    name: 'Advanced features',
    url: 'https://mui.com/x/react-tree-view/',
    example: <AdvancedFeatures />,
  },
];

export function TreeViewBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
