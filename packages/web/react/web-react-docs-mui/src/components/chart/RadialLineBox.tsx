import type React from 'react';
import BasicRadialLineChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radial-lines/BasicRadialLineChart';
import ClosedOpenRadialLineChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radial-lines/ClosedOpenRadialLineChart';
import ContinuousRadialLineChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radial-lines/ContinuousRadialLineChart';
import ElementHighlights from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radial-lines/ElementHighlights';
import RadialLineMarkShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radial-lines/RadialLineMarkShape';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/radial-lines/#basics',
    example: <BasicRadialLineChart />,
  },
  {
    name: 'Area & close path',
    url: 'https://mui.com/x/react-charts/radial-lines/#closing-path',
    example: <ClosedOpenRadialLineChart />,
  },
  {
    name: 'Axes',
    url: 'https://mui.com/x/react-charts/radial-lines/#axes',
    example: <ContinuousRadialLineChart />,
  },
  {
    name: 'Marks',
    url: 'https://mui.com/x/react-charts/radial-lines/#marks',
    example: <RadialLineMarkShape />,
  },
  {
    name: 'Highlight',
    url: 'https://mui.com/x/react-charts/radial-lines/#highlight',
    example: <ElementHighlights />,
  },
];

export function RadialLineBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
