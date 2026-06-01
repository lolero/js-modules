import type React from 'react';
import BasicHeatmap from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/heatmap/BasicHeatmap';
import HighlightHeatmap from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/heatmap/HighlightHeatmap';
import WebGLHeatmap from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/heatmap/WebGLHeatmap';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/heatmap/#basics',
    example: <BasicHeatmap />,
  },
  {
    name: 'Highlight',
    url: 'https://mui.com/x/react-charts/heatmap/#highlight',
    example: <HighlightHeatmap />,
  },
  {
    name: 'WebGl',
    url: 'https://mui.com/x/react-charts/heatmap/#webgl-renderer',
    example: <WebGLHeatmap />,
  },
];

export function HeatmapBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
