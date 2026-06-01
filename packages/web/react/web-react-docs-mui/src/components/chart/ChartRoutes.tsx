import type React from 'react';
import {
  WebModules,
  WebSubModulesChart,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { AreaBox } from './AreaBox';
import { BarBox } from './BarBox';
import { CandlestickBox } from './CandlestickBox';
import { ChartBox } from './ChartBox';
import { FunnelBox } from './FunnelBox';
import { GaugeBox } from './GaugeBox';
import { HeatmapBox } from './HeatmapBox';
import { LineBox } from './LineBox';
import { MapBox } from './MapBox';
import { PieBox } from './PieBox';
import { RadarBox } from './RadarBox';
import { RadialBarBox } from './RadialBarBox';
import { RadialLineBox } from './RadialLineBox';
import { SankeyBox } from './SankeyBox';
import { ScatterBox } from './ScatterBox';
import { SparklineBox } from './SparklineBox';

const subModuleBoxes: Record<WebSubModulesChart, React.ReactNode> = {
  [WebSubModulesChart.bar]: <BarBox />,
  [WebSubModulesChart.line]: <LineBox />,
  [WebSubModulesChart.area]: <AreaBox />,
  [WebSubModulesChart.pie]: <PieBox />,
  [WebSubModulesChart.scatter]: <ScatterBox />,
  [WebSubModulesChart.sparkline]: <SparklineBox />,
  [WebSubModulesChart.gauge]: <GaugeBox />,
  [WebSubModulesChart.radar]: <RadarBox />,
  [WebSubModulesChart.heatmap]: <HeatmapBox />,
  [WebSubModulesChart.funnel]: <FunnelBox />,
  [WebSubModulesChart.sankey]: <SankeyBox />,
  [WebSubModulesChart.candlestick]: <CandlestickBox />,
  [WebSubModulesChart.radialBar]: <RadialBarBox />,
  [WebSubModulesChart.radialLine]: <RadialLineBox />,
  [WebSubModulesChart.map]: <MapBox />,
};

export function ChartRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.chart}
      subModuleBoxes={subModuleBoxes}
      moduleBox={<ChartBox />}
    />
  );
}
