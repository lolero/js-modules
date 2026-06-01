import type React from 'react';
import AreaChartConnectNulls from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/areas-demo/AreaChartConnectNulls';
import AreaChartFillByValue from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/areas-demo/AreaChartFillByValue';
import PercentAreaChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/areas-demo/PercentAreaChart';
import SimpleAreaChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/areas-demo/SimpleAreaChart';
import StackedAreaChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/areas-demo/StackedAreaChart';
import TinyAreaChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/areas-demo/TinyAreaChart';
import AreaBaseline from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/AreaBaseline';
import LineAnimation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/LineAnimation';
import LineDefaultDomainLimit from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/lines/LineDefaultDomainLimit';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Tiny',
    url: 'https://mui.com/x/react-charts/areas-demo/#tinyareachart',
    example: <TinyAreaChart />,
  },
  {
    name: 'Simple',
    url: 'https://mui.com/x/react-charts/areas-demo/#simpleareachart',
    example: <SimpleAreaChart />,
  },
  {
    name: 'Stacked',
    url: 'https://mui.com/x/react-charts/areas-demo/#stackedareachart',
    example: <StackedAreaChart />,
  },
  {
    name: 'Percent',
    url: 'https://mui.com/x/react-charts/areas-demo/#percentareachart',
    example: <PercentAreaChart />,
  },
  {
    name: 'Null values',
    url: 'https://mui.com/x/react-charts/areas-demo/#areachartconnectnulls',
    example: <AreaChartConnectNulls />,
  },
  {
    name: 'Fill by value',
    url: 'https://mui.com/x/react-charts/areas-demo/#areachartfillbyvalue',
    example: <AreaChartFillByValue />,
  },
  {
    name: 'Domain limit',
    url: 'https://mui.com/x/react-charts/lines/#axis-domain',
    example: <LineDefaultDomainLimit />,
  },
  {
    name: 'Baseline',
    url: 'https://mui.com/x/react-charts/lines/#baseline',
    example: <AreaBaseline />,
  },
  {
    name: 'Animation',
    url: 'https://mui.com/x/react-charts/lines/#animation',
    example: <LineAnimation />,
  },
];

export function AreaBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
