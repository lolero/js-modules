import type React from 'react';
import BasicGeoDataPlot from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/map/BasicGeoDataPlot';
import ColorScaleMapShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/map/ColorScaleMapShape';
import GeoDataPlotDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/map/GeoDataPlotDemo';
import HighlightedMapShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/map/HighlightedMapShape';
import MapShapePlotDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/map/MapShapePlotDemo';
import ProjectionMapShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/map/ProjectionMapShape';
import VisibleMapShape from '../../_docsExamplesCopy-DO-NOT-EDIT/mui-x/charts/map/VisibleMapShape';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/x/react-charts/map/#overview',
    example: <BasicGeoDataPlot />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/x/react-charts/map/#rendering-the-base-map-with-geodataplot',
    example: <GeoDataPlotDemo />,
  },
  {
    name: 'Color map',
    url: 'https://mui.com/x/react-charts/map/#mapping-values-to-colors',
    example: <ColorScaleMapShape />,
  },
  {
    name: 'Projection',
    url: 'https://mui.com/x/react-charts/map/#modifying-the-projection',
    example: <ProjectionMapShape />,
  },
  {
    name: 'Highlight',
    url: 'https://mui.com/x/react-charts/map/#plotting-series-with-mapshapeplot',
    example: <MapShapePlotDemo />,
  },
  {
    name: 'Highlight scope',
    url: 'https://mui.com/x/react-charts/map/#managing-the-highlight-with-highlightscope',
    example: <HighlightedMapShape />,
  },
  {
    name: 'Legend',
    url: 'https://mui.com/x/react-charts/map/#managing-visibility-from-the-legend',
    example: <VisibleMapShape />,
  },
];

export function MapBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
