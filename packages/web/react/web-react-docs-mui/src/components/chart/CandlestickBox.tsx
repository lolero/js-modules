import type React from 'react';
import BasicCandlestick from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/candlestick/BasicCandlestick';
import CandlestickOverview from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/candlestick/CandlestickOverview';
import CandlestickValueFormatter from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/candlestick/CandlestickValueFormatter';
import ColorCandlestick from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/candlestick/ColorCandlestick';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Demo',
    url: 'https://mui.com/x/react-charts/candlestick/#overview',
    example: <CandlestickOverview />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/candlestick/#basics',
    example: <BasicCandlestick />,
  },
  {
    name: 'Value formatting',
    url: 'https://mui.com/x/react-charts/candlestick/#value-formatting',
    example: <CandlestickValueFormatter />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/x/react-charts/candlestick/#color',
    example: <ColorCandlestick />,
  },
];

export function CandlestickBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
