import type React from 'react';
import BubbleChartCO2Emissions from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bubble/BubbleChartCO2Emissions';
import BasicScatter from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter/BasicScatter';
import CustomScatter from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter/CustomScatter';
import ScatterBatchRenderer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter/ScatterBatchRenderer';
import ScatterCustomShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter/ScatterCustomShape';
import ScatterCustomSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter/ScatterCustomSize';
import ScatterOverview from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter/ScatterOverview';
import ScatterWebGLRenderer from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter/ScatterWebGLRenderer';
import MultipleYAxesScatterChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/scatter-demo/MultipleYAxesScatterChart';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-charts/scatter/#overview',
    example: <ScatterOverview />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/scatter/#basics',
    example: <BasicScatter />,
  },
  {
    name: 'Bubble',
    url: 'https://mui.com/x/react-charts/scatter-demo/#bulble-charts',
    example: <BubbleChartCO2Emissions />,
  },
  {
    name: 'Polygon',
    url: 'https://mui.com/x/react-charts/scatter/#plot-customization',
    example: <CustomScatter />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/x/react-charts/scatter/#size',
    example: <ScatterCustomSize />,
  },
  {
    name: 'Marks',
    url: 'https://mui.com/x/react-charts/scatter/#shape',
    example: <ScatterCustomShape />,
  },
  {
    name: 'Biaxial',
    url: 'https://mui.com/x/react-charts/scatter-demo/#multipleyaxesscatterchart',
    example: <MultipleYAxesScatterChart />,
  },
  {
    name: 'SVG batch',
    url: 'https://mui.com/x/react-charts/scatter/#svg-batch-rendering',
    example: <ScatterBatchRenderer />,
  },
  {
    name: 'WebGl',
    url: 'https://mui.com/x/react-charts/scatter/#webgl-renderer',
    example: <ScatterWebGLRenderer />,
  },
];

export function ScatterBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
