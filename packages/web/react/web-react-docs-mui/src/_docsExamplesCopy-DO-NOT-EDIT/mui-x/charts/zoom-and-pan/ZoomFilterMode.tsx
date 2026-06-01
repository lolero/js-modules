// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { BarChartPro } from '@mui/x-charts-pro/BarChartPro';
import { dataset, valueFormatter } from './letterFrequency';

export default function ZoomFilterMode() {
  return (
    <BarChartPro
      height={300}
      dataset={dataset}
      xAxis={[
        {
          dataKey: 'letter',
          zoom: { filterMode: 'discard' },
        },
      ]}
      yAxis={[{ valueFormatter }]}
      series={[{ label: 'Letter Frequency', dataKey: 'frequency', valueFormatter }]}
    />
  );
}
