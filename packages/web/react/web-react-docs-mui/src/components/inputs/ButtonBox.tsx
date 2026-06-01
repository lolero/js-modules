import type React from 'react';
import BasicButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/BasicButtons';
import ButtonSizes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/ButtonSizes';
import ColorButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/ColorButtons';
import ContainedButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/ContainedButtons';
import IconButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/IconButtons';
import IconButtonSizes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/IconButtonSizes';
import IconButtonWithBadge from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/IconButtonWithBadge';
import IconLabelButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/IconLabelButtons';
import LoadingButtonsTransition from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/LoadingButtonsTransition';
import OutlinedButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/OutlinedButtons';
import TextButtons from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/buttons/TextButtons';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-button/#basic-button',
    example: <BasicButtons />,
  },
  {
    name: 'Text',
    url: 'https://mui.com/material-ui/react-button/#text-button',
    example: <TextButtons />,
  },
  {
    name: 'Contained',
    url: 'https://mui.com/material-ui/react-button/#contained-button',
    example: <ContainedButtons />,
  },
  {
    name: 'Outlined',
    url: 'https://mui.com/material-ui/react-button/#outlined-button',
    example: <OutlinedButtons />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-button/#color',
    example: <ColorButtons />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-button/#sizes',
    example: <ButtonSizes />,
  },
  {
    name: 'Icon & label',
    url: 'https://mui.com/material-ui/react-button/#buttons-with-icons-and-label',
    example: <IconLabelButtons />,
  },
  {
    name: 'Icon button',
    url: 'https://mui.com/material-ui/react-button/#icon-button',
    example: <IconButtons />,
  },
  {
    name: 'Icon button size',
    url: 'https://mui.com/material-ui/react-button/#sizes-2',
    example: <IconButtonSizes />,
  },
  {
    name: 'Icon button with badge',
    url: 'https://mui.com/material-ui/react-button/#badge',
    example: <IconButtonWithBadge />,
  },
  {
    name: 'Loading',
    url: 'https://mui.com/material-ui/react-button/#loading-2',
    example: <LoadingButtonsTransition />,
  },
];

export function ButtonBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
