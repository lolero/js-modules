// @ts-nocheck
// Verbatim MUI docs example — copied by mui.copy-docs-examples.ts; not type-checked.

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'date',
    width: 150,
    type: 'date',
    renderHeader: () => (
      <strong>
        {'Birthday '}
        <span role="img" aria-label="enjoy">
          🎂
        </span>
      </strong>
    ),
  },
];

const rows = [
  {
    id: 1,
    date: new Date(1979, 0, 1),
  },
  {
    id: 2,
    date: new Date(1984, 1, 1),
  },
  {
    id: 3,
    date: new Date(1992, 2, 1),
  },
];

export default function RenderHeaderGrid() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
