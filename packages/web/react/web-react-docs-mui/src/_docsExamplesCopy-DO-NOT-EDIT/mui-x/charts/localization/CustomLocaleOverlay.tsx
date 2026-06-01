// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { BarChart } from '@mui/x-charts/BarChart';

export default function CustomLocaleOverlay() {
  return (
    <BarChart
      loading
      localeText={{ loading: 'Data are coming 🧙‍♂️' }}
      series={[]}
      height={200}
      width={300}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
    />
  );
}
