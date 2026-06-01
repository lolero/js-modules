import type React from 'react';
import ArcDesign from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/gauge/ArcDesign';
import ArcPlayground from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/gauge/ArcPlayground';
import BasicGauges from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/gauge/BasicGauges';
import TextPlayground from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/gauge/TextPlayground';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/gauge/#basics',
    example: <BasicGauges />,
  },
  {
    name: 'Arc',
    url: 'https://mui.com/x/react-charts/gauge/#arc-configuration',
    example: <ArcPlayground />,
  },
  {
    name: 'Label',
    url: 'https://mui.com/x/react-charts/gauge/#text-configuration',
    example: <TextPlayground />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/x/react-charts/gauge/#arc-design',
    example: <ArcDesign />,
  },
];

export function GaugeBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
