import type React from 'react';
import BasicTextFields from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/BasicTextFields';
import ColorTextFields from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/ColorTextFields';
import FormPropsTextFields from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/FormPropsTextFields';
import FullWidthTextField from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/FullWidthTextField';
import InputAdornments from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/InputAdornments';
import Inputs from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/Inputs';
import InputWithIcon from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/InputWithIcon';
import MultilineTextFields from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/MultilineTextFields';
import SelectTextFields from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/SelectTextFields';
import TextFieldSizes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/TextFieldSizes';
import ValidationTextFields from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/text-fields/ValidationTextFields';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Basic',
    url: 'https://mui.com/material-ui/react-text-field/#basic-textfield',
    example: <BasicTextFields />,
  },
  {
    name: 'Form props',
    url: 'https://mui.com/material-ui/react-text-field/#form-props',
    example: <FormPropsTextFields />,
  },
  {
    name: 'Validation',
    url: 'https://mui.com/material-ui/react-text-field/#validation',
    example: <ValidationTextFields />,
  },
  {
    name: 'Multiline',
    url: 'https://mui.com/material-ui/react-text-field/#multiline',
    example: <MultilineTextFields />,
  },
  {
    name: 'Select',
    url: 'https://mui.com/material-ui/react-text-field/#select',
    example: <SelectTextFields />,
  },
  {
    name: 'Icons',
    url: 'https://mui.com/material-ui/react-text-field/#icons',
    example: <InputWithIcon />,
  },
  {
    name: 'Input adornments',
    url: 'https://mui.com/material-ui/react-text-field/#input-adornments',
    example: <InputAdornments />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-text-field/#sizes',
    example: <TextFieldSizes />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-text-field/#color',
    example: <ColorTextFields />,
  },
  {
    name: 'Full width',
    url: 'https://mui.com/material-ui/react-text-field/#full-width',
    example: <FullWidthTextField />,
  },
  {
    name: 'Inputs',
    url: 'https://mui.com/material-ui/react-text-field/#inputs',
    example: <Inputs />,
  },
];

export function TextFieldBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
