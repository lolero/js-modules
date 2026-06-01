// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function DisabledColumnMenuGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
    maxColumns: 5,
  });

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid {...data} disableColumnMenu />
    </div>
  );
}
