import type React from 'react';
import SelectAllTransferList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/transfer-list/SelectAllTransferList';
import TransferList from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/transfer-list/TransferList';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-transfer-list/#basic-transfer-list',
    example: <TransferList />,
  },
  {
    name: 'Enhanced',
    url: 'https://mui.com/material-ui/react-transfer-list/#enhanced-transfer-list',
    example: <SelectAllTransferList />,
  },
];

export function TransferListBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
