import type React from 'react';
import BasicSelect from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/BasicSelect';
import GroupedSelect from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/GroupedSelect';
import MultipleSelect from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/MultipleSelect';
import MultipleSelectCheckmarks from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/MultipleSelectCheckmarks';
import MultipleSelectChip from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/MultipleSelectChip';
import MultipleSelectNative from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/MultipleSelectNative';
import MultipleSelectPlaceholder from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/MultipleSelectPlaceholder';
import NativeSelectDemo from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/NativeSelectDemo';
import SelectLabels from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/SelectLabels';
import SelectOtherProps from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/SelectOtherProps';
import SelectSmall from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/SelectSmall';
import SelectVariants from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/selects/SelectVariants';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-select/#basic-select',
    example: <BasicSelect />,
  },
  {
    name: 'Variants',
    url: 'https://mui.com/material-ui/react-select/#variants',
    example: <SelectVariants />,
  },
  {
    name: 'Label and helper text',
    url: 'https://mui.com/material-ui/react-select/#labels-and-helper-text',
    example: <SelectLabels />,
  },
  {
    name: 'Small',
    url: 'https://mui.com/material-ui/react-select/#small-size',
    example: <SelectSmall />,
  },
  {
    name: 'Other props',
    url: 'https://mui.com/material-ui/react-select/#other-props',
    example: <SelectOtherProps />,
  },
  {
    name: 'Native select',
    url: 'https://mui.com/material-ui/react-select/#native-select',
    example: <NativeSelectDemo />,
  },
  {
    name: 'Multiple',
    url: 'https://mui.com/material-ui/react-select/#multiple-select',
    example: <MultipleSelect />,
  },
  {
    name: 'Selection indicators',
    url: 'https://mui.com/material-ui/react-select/#selection-indicators',
    example: <MultipleSelectCheckmarks />,
  },
  {
    name: 'Chip',
    url: 'https://mui.com/material-ui/react-select/#chip',
    example: <MultipleSelectChip />,
  },
  {
    name: 'Multiple native',
    url: 'https://mui.com/material-ui/react-select/#native',
    example: <MultipleSelectNative />,
  },
  {
    name: 'Placeholder',
    url: 'https://mui.com/material-ui/react-select/#placeholder',
    example: <MultipleSelectPlaceholder />,
  },
  {
    name: 'Grouping',
    url: 'https://mui.com/material-ui/react-select/#grouping',
    example: <GroupedSelect />,
  },
];

export function SelectBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
