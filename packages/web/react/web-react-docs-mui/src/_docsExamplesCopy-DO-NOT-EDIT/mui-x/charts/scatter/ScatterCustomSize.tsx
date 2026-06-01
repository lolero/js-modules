// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { ScatterChart } from '@mui/x-charts/ScatterChart';
import data from '../dataset/random/scatterParallel.json';

export default function ScatterCustomSize() {
  return (
    <ScatterChart
      height={300}
      series={[
        {
          label: 'Series A',
          data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
          markerSize: 8,
        },
        {
          label: 'Series B',
          data: data.map((v) => ({ x: v.x2, y: v.y2, id: v.id })),
          markerSize: 4,
        },
      ]}
    />
  );
}
