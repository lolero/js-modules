import type React from 'react';
import AdvancedCharts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/charts/advancedCharts/AdvancedChartDemo';
import AdvancedFeatures from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/charts/advancedFeatures/AdvancedFeatures';
import EssentialCharts from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/charts/essentialCharts/EssentialCharts';
import FeaturesHighlight from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/charts/featuresHighlight/FeaturesHighlight';
import MainDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/components/overview/charts/mainDemo/MainDemo';
import AreaChartsGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/examples/AreaChartsGrid';
import BarChartsGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/examples/BarChartsGrid';
import LineChartsGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/examples/LineChartsGrid';
import OtherChartsGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/examples/OtherChartsGrid';
import PieChartsGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/examples/PieChartsGrid';
import ScatterChartsGrid from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/examples/ScatterChartsGrid';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-charts/',
    example: <MainDemo />,
  },
  {
    name: 'Features',
    url: 'https://mui.com/x/react-charts/',
    example: <FeaturesHighlight />,
  },
  {
    name: 'Essential charts',
    url: 'https://mui.com/x/react-charts/',
    example: <EssentialCharts />,
  },
  {
    name: 'Advanced charts',
    url: 'https://mui.com/x/react-charts/',
    example: <AdvancedCharts />,
  },
  {
    name: 'Advanced features',
    url: 'https://mui.com/x/react-charts/',
    example: <AdvancedFeatures />,
  },
  {
    name: 'Bar charts',
    url: 'https://mui.com/x/react-charts/examples/#bar-charts',
    example: <BarChartsGrid />,
  },
  {
    name: 'Line charts',
    url: 'https://mui.com/x/react-charts/examples/#line-charts',
    example: <LineChartsGrid />,
  },
  {
    name: 'Area charts',
    url: 'https://mui.com/x/react-charts/examples/#area-charts',
    example: <AreaChartsGrid />,
  },
  {
    name: 'Scatter charts',
    url: 'https://mui.com/x/react-charts/examples/#scatter-charts',
    example: <ScatterChartsGrid />,
  },
  {
    name: 'Pie charts',
    url: 'https://mui.com/x/react-charts/examples/#pie-charts',
    example: <PieChartsGrid />,
  },
  {
    name: 'Other charts',
    url: 'https://mui.com/x/react-charts/examples/#other-charts',
    example: <OtherChartsGrid />,
  },
];

export function ChartBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
