import type React from 'react';
import BiaxialLineChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/BiaxialLineChart';
import CustomLabelChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/CustomLabelChart';
import DashedLineChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/DashedLineChart';
import LineChartConnectNulls from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/LineChartConnectNulls';
import LineChartWithReferenceLines from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/LineChartWithReferenceLines';
import LineWithUncertaintyArea from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/LineWithUncertaintyArea';
import LiveLineChartNoSnap from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/LiveLineChartNoSnap';
import SimpleLineChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/SimpleLineChart';
import TinyLineChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/line-demo/TinyLineChart';
import ExpandingStep from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/ExpandingStep';
import GridDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/GridDemo';
import InterpolationDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/InterpolationDemo';
import LineMarkShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/LineMarkShape';
import LineOverview from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/LineOverview';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Tiny',
    url: 'https://mui.com/x/react-charts/line-demo/#tinylinechart',
    example: <TinyLineChart />,
  },
  {
    name: 'Simple',
    url: 'https://mui.com/x/react-charts/line-demo/#simplelinechart',
    example: <SimpleLineChart />,
  },
  {
    name: 'Dashed',
    url: 'https://mui.com/x/react-charts/line-demo/#dashedlinechart',
    example: <DashedLineChart />,
  },
  {
    name: 'Biaxial',
    url: 'https://mui.com/x/react-charts/line-demo/#biaxiallinechart',
    example: <BiaxialLineChart />,
  },
  {
    name: 'Null values',
    url: 'https://mui.com/x/react-charts/line-demo/#linechartconnectnulls',
    example: <LineChartConnectNulls />,
  },
  {
    name: 'Reference',
    url: 'https://mui.com/x/react-charts/line-demo/#linechartwithreferencelines',
    example: <LineChartWithReferenceLines />,
  },
  {
    name: 'Labels',
    url: 'https://mui.com/x/react-charts/line-demo/#customlabellinechart',
    example: <CustomLabelChart />,
  },
  {
    name: 'Live data',
    url: 'https://mui.com/x/react-charts/line-demo/#line-chart-with-live-data',
    example: <LiveLineChartNoSnap />,
  },
  {
    name: 'Forecast',
    url: 'https://mui.com/x/react-charts/line-demo/#line-with-forecast',
    example: <LineWithUncertaintyArea />,
  },
  {
    name: 'Marks',
    url: 'https://mui.com/x/react-charts/lines/#marks',
    example: <LineMarkShape />,
  },
  {
    name: 'Grid',
    url: 'https://mui.com/x/react-charts/lines/#grid',
    example: <GridDemo />,
  },
  {
    name: 'Interpolation',
    url: 'https://mui.com/x/react-charts/lines/#interpolation',
    example: <InterpolationDemo />,
  },
  {
    name: 'Steps',
    url: 'https://mui.com/x/react-charts/lines/#interpolation',
    example: <ExpandingStep />,
  },
  {
    name: 'Zoom',
    url: 'https://mui.com/x/react-charts/lines/#overview',
    example: <LineOverview />,
  },
];

export function LineBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
