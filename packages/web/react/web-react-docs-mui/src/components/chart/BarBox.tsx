import type React from 'react';
import BarChartStackedBySign from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/BarChartStackedBySign';
import BiaxialBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/BiaxialBarChart';
import HistogramBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/HistogramBarChart';
import MixedBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/MixedBarChart';
import PopulationPyramidBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/PopulationPyramidBarChart';
import PositiveAndNegativeBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/PositiveAndNegativeBarChart';
import SimpleBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/SimpleBarChart';
import StackedBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/StackedBarChart';
import TinyBarChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/TinyBarChart';
import WaterfallChart from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bar-demo/WaterfallChart';
import BarLabelPlacement from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bars/BarLabelPlacement';
import BorderRadius from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bars/BorderRadius';
import GridDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bars/GridDemo';
import HorizontalBars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bars/HorizontalBars';
import TickPlacementBars from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/bars/TickPlacementBars';
import BasicRangeBar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/range-bar/BasicRangeBar';
import RangeBarAnimation from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/range-bar/RangeBarAnimation';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Tini',
    url: 'https://mui.com/x/react-charts/bar-demo/#tinybarchart',
    example: <TinyBarChart />,
  },
  {
    name: 'Histogram',
    url: 'https://mui.com/x/react-charts/bar-demo/#histogram',
    example: <HistogramBarChart />,
  },
  {
    name: 'Simple',
    url: 'https://mui.com/x/react-charts/bar-demo/#simplebarchart',
    example: <SimpleBarChart />,
  },
  {
    name: 'Stacked',
    url: 'https://mui.com/x/react-charts/bar-demo/#stackedbarchart',
    example: <StackedBarChart />,
  },
  {
    name: 'Mixed',
    url: 'https://mui.com/x/react-charts/bar-demo/#mixedbarchart',
    example: <MixedBarChart />,
  },
  {
    name: 'Positive & negative simple',
    url: 'https://mui.com/x/react-charts/bar-demo/#positiveandnegativebarchart',
    example: <PositiveAndNegativeBarChart />,
  },
  {
    name: 'Positive & negative stacked',
    url: 'https://mui.com/x/react-charts/bar-demo/#barchartstackedbysign',
    example: <BarChartStackedBySign />,
  },
  {
    name: 'Biaxial',
    url: 'https://mui.com/x/react-charts/bar-demo/#biaxialbarchart',
    example: <BiaxialBarChart />,
  },
  {
    name: 'Range',
    url: 'https://mui.com/x/react-charts/range-bar/#basics',
    example: <BasicRangeBar />,
  },
  {
    name: 'Waterfall',
    url: 'https://mui.com/x/react-charts/bar-demo/#waterfall-chart',
    example: <WaterfallChart />,
  },
  {
    name: 'Horizontal',
    url: 'https://mui.com/x/react-charts/bars/#bar-direction',
    example: <HorizontalBars />,
  },
  {
    name: 'Grid',
    url: 'https://mui.com/x/react-charts/bars/#grid',
    example: <GridDemo />,
  },
  {
    name: 'Pyramid',
    url: 'https://mui.com/x/react-charts/bar-demo/#population-pyramid',
    example: <PopulationPyramidBarChart />,
  },
  {
    name: 'Ticks',
    url: 'https://mui.com/x/react-charts/bars/#tick-placement',
    example: <TickPlacementBars />,
  },
  {
    name: 'Labels',
    url: 'https://mui.com/x/react-charts/bars/#label-placement',
    example: <BarLabelPlacement />,
  },
  {
    name: 'Animation',
    url: 'https://mui.com/x/react-charts/range-bar/#animation',
    example: <RangeBarAnimation />,
  },
  {
    name: 'Border radius',
    url: 'https://mui.com/x/react-charts/bars/#border-radius',
    example: <BorderRadius />,
  },
];

export function BarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
