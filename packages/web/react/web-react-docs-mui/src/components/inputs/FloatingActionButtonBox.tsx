import Box from '@mui/material/Box';
import type React from 'react';
import FloatingActionButtonExtendedSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/floating-action-button/FloatingActionButtonExtendedSize';
import FloatingActionButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/floating-action-button/FloatingActionButtons';
import FloatingActionButtonSize from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/floating-action-button/FloatingActionButtonSize';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-floating-action-button/#basic-fab',
    example: <FloatingActionButtons />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-floating-action-button/#size',
    example: (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <FloatingActionButtonSize />
        <FloatingActionButtonExtendedSize />
      </Box>
    ),
  },
];

export function FloatingActionButtonBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
