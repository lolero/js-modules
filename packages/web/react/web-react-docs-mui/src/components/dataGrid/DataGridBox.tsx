import type React from 'react';
import PopularFeaturesDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/data-grid/features/PopularFeaturesDemo';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Popular features demos',
    url: 'https://mui.com/x/react-data-grid/features/',
    example: <PopularFeaturesDemo />,
  },
];

export function DataGridBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
