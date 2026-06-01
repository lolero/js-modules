import type React from 'react';
import BasicTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/BasicTable';
import CollapsibleTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/CollapsibleTable';
import ColumnGroupingTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/ColumnGroupingTable';
import CustomPaginationActionsTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/CustomPaginationActionsTable';
import DataTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/DataTable';
import DenseTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/DenseTable';
import EnhancedTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/EnhancedTable';
import SpanningTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/SpanningTable';
import StickyHeadTable from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/table/StickyHeadTable';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-table/#basic-table',
    example: <BasicTable />,
  },
  {
    name: 'Data',
    url: 'https://mui.com/material-ui/react-table/#data-table',
    example: <DataTable />,
  },
  {
    name: 'Dense',
    url: 'https://mui.com/material-ui/react-table/#dense-table',
    example: <DenseTable />,
  },
  {
    name: 'Sort & select',
    url: 'https://mui.com/material-ui/react-table/#sorting-selecting',
    example: <EnhancedTable />,
  },
  {
    name: 'Pagination',
    url: 'https://mui.com/material-ui/react-table/#custom-pagination-actions',
    example: <CustomPaginationActionsTable />,
  },
  {
    name: 'Sticky header',
    url: 'https://mui.com/material-ui/react-table/#sticky-header',
    example: <StickyHeadTable />,
  },
  {
    name: 'Column groups',
    url: 'https://mui.com/material-ui/react-table/#column-grouping',
    example: <ColumnGroupingTable />,
  },
  {
    name: 'Collapsible',
    url: 'https://mui.com/material-ui/react-table/#collapsible-table',
    example: <CollapsibleTable />,
  },
  {
    name: 'Spanning',
    url: 'https://mui.com/material-ui/react-table/#spanning-table',
    example: <SpanningTable />,
  },
];

export function TableBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
