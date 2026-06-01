import type React from 'react';
import BasicMenubar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menubar/BasicMenubar';
import CheckboxItemsMenubar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menubar/CheckboxItemsMenubar';
import GroupLabelMenubar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menubar/GroupLabelMenubar';
import IconItemsMenubar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menubar/IconItemsMenubar';
import RadioGroupItemsMenubar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menubar/RadioGroupItemsMenubar';
import ShortcutHintsMenubar from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/menubar/ShortcutHintsMenubar';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-menubar/#basic-menubar',
    example: <BasicMenubar />,
  },
  {
    name: 'Shortcut hints',
    url: 'https://mui.com/material-ui/react-menubar/#shortcut-hints',
    example: <ShortcutHintsMenubar />,
  },
  {
    name: 'Checkbox items',
    url: 'https://mui.com/material-ui/react-menubar/#checkbox-items',
    example: <CheckboxItemsMenubar />,
  },
  {
    name: 'Radio group items',
    url: 'https://mui.com/material-ui/react-menubar/#radio-group-items',
    example: <RadioGroupItemsMenubar />,
  },
  {
    name: 'Icons',
    url: 'https://mui.com/material-ui/react-menubar/#icon-menu-items',
    example: <IconItemsMenubar />,
  },
  {
    name: 'Group labels',
    url: 'https://mui.com/material-ui/react-menubar/#group-labels',
    example: <GroupLabelMenubar />,
  },
];

export function MenubarBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
