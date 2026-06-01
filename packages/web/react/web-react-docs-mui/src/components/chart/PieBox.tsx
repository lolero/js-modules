import type React from 'react';
import BasicPie from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/BasicPie';
import DonutChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/DonutChart';
import PieActiveArc from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/PieActiveArc';
import PieAnimation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/PieAnimation';
import PieArcLabel from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/PieArcLabel';
import PieColor from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/PieColor';
import PieShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/PieShape';
import TitanicPie from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie/TitanicPie';
import PieChartWithCenterLabel from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie-demo/PieChartWithCenterLabel';
import PieChartWithCustomLegendAndTooltip from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie-demo/PieChartWithCustomLegendAndTooltip';
import PieChartWithPaddingAngle from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie-demo/PieChartWithPaddingAngle';
import StraightAnglePieChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie-demo/StraightAnglePieChart';
import TwoLevelPieChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/pie-demo/TwoLevelPieChart';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-charts/pie/#overview',
    example: <TitanicPie />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/pie/#basics',
    example: <BasicPie />,
  },
  {
    name: 'Donut',
    url: 'https://mui.com/x/react-charts/pie/#basics',
    example: <DonutChart />,
  },
  {
    name: 'Two levels',
    url: 'https://mui.com/x/react-charts/pie-demo/#twolevelpiechart',
    example: <TwoLevelPieChart />,
  },
  {
    name: 'Straight angle',
    url: 'https://mui.com/x/react-charts/pie-demo/#straightanglepiechart',
    example: <StraightAnglePieChart />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/x/react-charts/pie/#colors',
    example: <PieColor />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/x/react-charts/pie/#sizing',
    example: <PieShape />,
  },
  {
    name: 'Labels',
    url: 'https://mui.com/x/react-charts/pie/#labels',
    example: <PieArcLabel />,
  },
  {
    name: 'Center label',
    url: 'https://mui.com/x/react-charts/pie-demo/#piechartwithcenterlabel',
    example: <PieChartWithCenterLabel />,
  },
  {
    name: 'Legend marks',
    url: 'https://mui.com/x/react-charts/pie-demo/#pie-chart-with-custom-mark-in-legend-and-tooltip',
    example: <PieChartWithCustomLegendAndTooltip />,
  },
  {
    name: 'Padding angle',
    url: 'https://mui.com/x/react-charts/pie-demo/#piechartwithpaddingangle',
    example: <PieChartWithPaddingAngle />,
  },
  {
    name: 'Highlight',
    url: 'https://mui.com/x/react-charts/pie/#highlight',
    example: <PieActiveArc />,
  },
  {
    name: 'Animation',
    url: 'https://mui.com/x/react-charts/pie/#animation',
    example: <PieAnimation />,
  },
];

export function PieBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
