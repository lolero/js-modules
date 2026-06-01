import type React from 'react';
import AvatarChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/AvatarChips';
import BasicChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/BasicChips';
import ChipsPlayground from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/ChipsPlayground';
import ClickableAndDeletableChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/ClickableAndDeletableChips';
import ClickableChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/ClickableChips';
import ColorChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/ColorChips';
import CustomDeleteIconChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/CustomDeleteIconChips';
import DeletableChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/DeletableChips';
import IconChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/IconChips';
import MultilineChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/MultilineChips';
import SizesChips from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/chips/SizesChips';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Playground',
    url: 'https://mui.com/material-ui/react-chip/#chip-playground',
    example: <ChipsPlayground />,
  },
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-chip/#basic-chip',
    example: <BasicChips />,
  },
  {
    name: 'Clickable',
    url: 'https://mui.com/material-ui/react-chip/#clickable',
    example: <ClickableChips />,
  },
  {
    name: 'Deletable',
    url: 'https://mui.com/material-ui/react-chip/#deletable',
    example: <DeletableChips />,
  },
  {
    name: 'Clickable & deletable',
    url: 'https://mui.com/material-ui/react-chip/#clickable-and-deletable',
    example: <ClickableAndDeletableChips />,
  },
  {
    name: 'Custom delete icon',
    url: 'https://mui.com/material-ui/react-chip/#custom-delete-icon',
    example: <CustomDeleteIconChips />,
  },
  {
    name: 'Avatar',
    url: 'https://mui.com/material-ui/react-chip/#avatar-chip',
    example: <AvatarChips />,
  },
  {
    name: 'Icon',
    url: 'https://mui.com/material-ui/react-chip/#icon-chip',
    example: <IconChips />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-chip/#color-chip',
    example: <ColorChips />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-chip/#sizes-chip',
    example: <SizesChips />,
  },
  {
    name: 'Multilline',
    url: 'https://mui.com/material-ui/react-chip/#multiline-chip',
    example: <MultilineChips />,
  },
];

export function ChipBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
