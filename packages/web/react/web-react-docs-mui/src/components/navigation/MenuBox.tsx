import type React from 'react';
import AccountMenu from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menus/AccountMenu';
import BasicMenu from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menus/BasicMenu';
import DenseMenu from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menus/DenseMenu';
import GroupedMenu from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menus/GroupedMenu';
import IconMenu from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menus/IconMenu';
import LongMenu from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menus/LongMenu';
import SimpleListMenu from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menus/SimpleListMenu';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-menu/#basic-menu',
    example: <BasicMenu />,
  },
  {
    name: 'Dense',
    url: 'https://mui.com/material-ui/react-menu/#dense-menu',
    example: <DenseMenu />,
  },
  {
    name: 'Selected item',
    url: 'https://mui.com/material-ui/react-menu/#selected-menu',
    example: <SimpleListMenu />,
  },
  {
    name: 'Icons',
    url: 'https://mui.com/material-ui/react-menu/#icon-menu',
    example: <IconMenu />,
  },
  {
    name: 'Avatars',
    url: 'https://mui.com/material-ui/react-menu/#account-menu',
    example: <AccountMenu />,
  },
  {
    name: 'Scrollable',
    url: 'https://mui.com/material-ui/react-menu/#max-height-menu',
    example: <LongMenu />,
  },
  {
    name: 'Groups',
    url: 'https://mui.com/material-ui/react-menu/#grouped-menu',
    example: <GroupedMenu />,
  },
];

export function MenuBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
