import type React from 'react';
import BasicRadar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/BasicRadar';
import DemoRadar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/DemoRadar';
import DemoRadarAxis from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/DemoRadarAxis';
import DemoRadarAxisHighlight from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/DemoRadarAxisHighlight';
import DemoRadarSeriesHighlight from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/DemoRadarSeriesHighlight';
import DemoRadarVisualisation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/DemoRadarVisualisation';
import MultiSeriesRadar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/MultiSeriesRadar';
import RadarTooltip from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/radar/RadarTooltip';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/radar/#overview',
    example: <BasicRadar />,
  },
  {
    name: 'Multi series',
    url: 'https://mui.com/x/react-charts/radar/#multi-series',
    example: <MultiSeriesRadar />,
  },
  {
    name: 'Seires options',
    url: 'https://mui.com/x/react-charts/radar/#series-options',
    example: <DemoRadarVisualisation />,
  },
  {
    name: 'Grid',
    url: 'https://mui.com/x/react-charts/radar/#grid',
    example: <DemoRadar />,
  },
  {
    name: 'Labels',
    url: 'https://mui.com/x/react-charts/radar/#axis-values',
    example: <DemoRadarAxis />,
  },
  {
    name: 'Highlight axis',
    url: 'https://mui.com/x/react-charts/radar/#highlight',
    example: <DemoRadarAxisHighlight />,
  },
  {
    name: 'Highlight series',
    url: 'https://mui.com/x/react-charts/radar/#series-highlight',
    example: <DemoRadarSeriesHighlight />,
  },
  {
    name: 'Tooltip',
    url: 'https://mui.com/x/react-charts/radar/#tooltip',
    example: <RadarTooltip />,
  },
];

export function RadarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
