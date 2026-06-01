import type React from 'react';
import SankeyBasicDataStructure from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyBasicDataStructure';
import SankeyCurveCorrection from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyCurveCorrection';
import SankeyDetailedDataStructure from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyDetailedDataStructure';
import SankeyHighlighting from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyHighlighting';
import SankeyIterations from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyIterations';
import SankeyLinkKeywordColors from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyLinkKeywordColors';
import SankeyLinkSorting from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyLinkSorting';
import SankeyLinkStyling from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyLinkStyling';
import SankeyNodeAlignment from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyNodeAlignment';
import SankeyNodeSorting from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyNodeSorting';
import SankeyNodeStyling from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyNodeStyling';
import SankeyOverview from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyOverview';
import SankeyValueFormatter from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/sankey/SankeyValueFormatter';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-charts/sankey/#overview',
    example: <SankeyOverview />,
  },
  {
    name: 'Automatic nodes',
    url: 'https://mui.com/x/react-charts/sankey/#automatic-nodes',
    example: <SankeyBasicDataStructure />,
  },
  {
    name: 'Explicit nodes',
    url: 'https://mui.com/x/react-charts/sankey/#explicit-nodes',
    example: <SankeyDetailedDataStructure />,
  },
  {
    name: 'Styles nodes',
    url: 'https://mui.com/x/react-charts/sankey/#default-node-styles',
    example: <SankeyNodeStyling />,
  },
  {
    name: 'Styles links',
    url: 'https://mui.com/x/react-charts/sankey/#default-link-styles',
    example: <SankeyLinkStyling />,
  },
  {
    name: 'Link color mode',
    url: 'https://mui.com/x/react-charts/sankey/#link-color-keywords',
    example: <SankeyLinkKeywordColors />,
  },
  {
    name: 'Node alignment',
    url: 'https://mui.com/x/react-charts/sankey/#node-alignment',
    example: <SankeyNodeAlignment />,
  },
  {
    name: 'Curve correction',
    url: 'https://mui.com/x/react-charts/sankey/#curve-correction',
    example: <SankeyCurveCorrection />,
  },
  {
    name: 'Value formatting',
    url: 'https://mui.com/x/react-charts/sankey/#value-formatting',
    example: <SankeyValueFormatter />,
  },
  {
    name: 'Sorting nodes',
    url: 'https://mui.com/x/react-charts/sankey/#node-sorting',
    example: <SankeyNodeSorting />,
  },
  {
    name: 'Sorting links',
    url: 'https://mui.com/x/react-charts/sankey/#link-sorting',
    example: <SankeyLinkSorting />,
  },
  {
    name: 'Layout iterations',
    url: 'https://mui.com/x/react-charts/sankey/#layout-iterations',
    example: <SankeyIterations />,
  },
  {
    name: 'Highlight',
    url: 'https://mui.com/x/react-charts/sankey/#highlighting',
    example: <SankeyHighlighting />,
  },
];

export function SankeyBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
