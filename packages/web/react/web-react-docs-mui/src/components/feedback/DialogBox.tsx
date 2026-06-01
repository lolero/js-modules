import type React from 'react';
import AlertDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/AlertDialog';
import AlertDialogSlide from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/AlertDialogSlide';
import ConfirmationDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/ConfirmationDialog';
import DraggableDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/DraggableDialog';
import FormDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/FormDialog';
import FullScreenDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/FullScreenDialog';
import MaxWidthDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/MaxWidthDialog';
import ResponsiveDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/ResponsiveDialog';
import ScrollDialog from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/ScrollDialog';
import SimpleDialogDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/dialogs/SimpleDialogDemo';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-dialog/#introduction',
    example: <SimpleDialogDemo />,
  },
  {
    name: 'Alert',
    url: 'https://mui.com/material-ui/react-dialog/#alerts',
    example: <AlertDialog />,
  },
  {
    name: 'Form',
    url: 'https://mui.com/material-ui/react-dialog/#form-dialogs',
    example: <FormDialog />,
  },
  {
    name: 'Confirmation',
    url: 'https://mui.com/material-ui/react-dialog/#confirmation-dialogs',
    example: <ConfirmationDialog />,
  },
  {
    name: 'Transition',
    url: 'https://mui.com/material-ui/react-dialog/#transitions',
    example: <AlertDialogSlide />,
  },
  {
    name: 'Full-screen',
    url: 'https://mui.com/material-ui/react-dialog/#full-screen-dialogs',
    example: <FullScreenDialog />,
  },
  {
    name: 'Full-screen responsive',
    url: 'https://mui.com/material-ui/react-dialog/#responsive-full-screen',
    example: <ResponsiveDialog />,
  },
  {
    name: 'Max width',
    url: 'https://mui.com/material-ui/react-dialog/#optional-sizes',
    example: <MaxWidthDialog />,
  },
  {
    name: 'Draggable',
    url: 'https://mui.com/material-ui/react-dialog/#draggable-dialog',
    example: <DraggableDialog />,
  },
  {
    name: 'Scrollable',
    url: 'https://mui.com/material-ui/react-dialog/#scrolling-long-content',
    example: <ScrollDialog />,
  },
];

export function DialogBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
