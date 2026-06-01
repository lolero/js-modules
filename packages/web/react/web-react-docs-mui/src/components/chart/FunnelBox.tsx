import type React from 'react';
import FunnelCategoryAxis from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/FunnelCategoryAxis';
import FunnelColor from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/FunnelColor';
import FunnelCurves from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/FunnelCurves';
import FunnelLabelPositioning from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/FunnelLabelPositioning';
import FunnelLegend from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/FunnelLegend';
import FunnelLinearScale from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/FunnelLinearScale';
import FunnelStacked from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/FunnelStacked';
import HighlightFunnel from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/funnel/HighlightFunnel';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/x/react-charts/funnel/#curve-interpolation',
    example: <FunnelCurves />,
  },
  {
    name: 'Multiple',
    url: 'https://mui.com/x/react-charts/funnel/#multiple-funnels',
    example: <FunnelStacked />,
  },
  {
    name: 'Legend',
    url: 'https://mui.com/x/react-charts/funnel/#legend',
    example: <FunnelLegend />,
  },
  {
    name: 'Labels',
    url: 'https://mui.com/x/react-charts/funnel/#positioning-labels',
    example: <FunnelLabelPositioning />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/x/react-charts/funnel/#colors',
    example: <FunnelColor />,
  },
  {
    name: 'Highlight',
    url: 'https://mui.com/x/react-charts/funnel/#highlight',
    example: <HighlightFunnel />,
  },
  {
    name: 'Axis',
    url: 'https://mui.com/x/react-charts/funnel/#auto-sizing-axis',
    example: <FunnelCategoryAxis />,
  },
  {
    name: 'Scale',
    url: 'https://mui.com/x/react-charts/funnel/#scaled-sections',
    example: <FunnelLinearScale />,
  },
];

export function FunnelBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
