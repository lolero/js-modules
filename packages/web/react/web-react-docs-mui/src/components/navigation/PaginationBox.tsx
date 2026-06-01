import type React from 'react';
import BasicPagination from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/BasicPagination';
import CustomIcons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/CustomIcons';
import PaginationButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/PaginationButtons';
import PaginationOutlined from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/PaginationOutlined';
import PaginationRanges from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/PaginationRanges';
import PaginationRounded from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/PaginationRounded';
import PaginationSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/PaginationSize';
import TablePaginationDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/pagination/TablePaginationDemo';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-pagination/#basic-pagination',
    example: <BasicPagination />,
  },
  {
    name: 'Outlined',
    url: 'https://mui.com/material-ui/react-pagination/#outlined-pagination',
    example: <PaginationOutlined />,
  },
  {
    name: 'Rounded',
    url: 'https://mui.com/material-ui/react-pagination/#rounded-pagination',
    example: <PaginationRounded />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-pagination/#pagination-size',
    example: <PaginationSize />,
  },
  {
    name: 'Buttons',
    url: 'https://mui.com/material-ui/react-pagination/#buttons',
    example: <PaginationButtons />,
  },
  {
    name: 'Custom icons',
    url: 'https://mui.com/material-ui/react-pagination/#custom-icons',
    example: <CustomIcons />,
  },
  {
    name: 'Ranges',
    url: 'https://mui.com/material-ui/react-pagination/#pagination-ranges',
    example: <PaginationRanges />,
  },
  {
    name: 'Table',
    url: 'https://mui.com/material-ui/react-pagination/#table-pagination',
    example: <TablePaginationDemo />,
  },
];

export function PaginationBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
