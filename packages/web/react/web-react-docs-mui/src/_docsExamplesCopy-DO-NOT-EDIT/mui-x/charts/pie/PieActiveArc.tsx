// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './webUsageStats';

export default function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={200}
      width={200}
    />
  );
}
