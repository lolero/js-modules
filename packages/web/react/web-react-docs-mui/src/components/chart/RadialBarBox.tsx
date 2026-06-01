import type React from 'react';
import BasicRadialBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radial-bars/BasicRadialBarChart';
import RadialBarConfig from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radial-bars/RadialBarConfig';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/x/react-charts/radial-bars/#common-display-options',
    example: <RadialBarConfig />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/radial-bars/#basics',
    example: <BasicRadialBarChart />,
  },
];

export function RadialBarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
